import { InvalidArgumentError, Option, program } from "commander";
import DomHandler from "domhandler";
import yauzl from "yauzl";
import { WritableStream } from "htmlparser2/lib/WritableStream";
import { buffer } from "node:stream/consumers";
import { promisify } from "node:util";
import * as dom from "domutils";
import { Console } from "console";

const DOC_PATH_RE = /^\/document\/d\/([\w-]+)\//;

/*
  so I decided to comment this monstrosity
  // course name
  (
    [
      \w\s // letters, numbers, spaces
      \(\) // parens
      \/ // slash
      ,'\.:&- // random symbols
    ]+
  )
    
  // course ID
  (
    [\dA-Z]+ // numbers and capital letters
    // zero or more additional course IDs
    (?:
      \/
      [\dA-Z]+
    )* 
  )
  
  // optional annotation???
  (
    ? // sometimes there's a space, sometimes there isn't
    \(
      [\w\s]+ // letters, numbers, spces contained in actual parens
    \)
  )?
  \s+ // whitespace
  
  // Pg: or Pg.
  // there is only ONE class that uses Pg. instead of Pg: (why???)
  // Language & Literature I (TAG IB) 1136
  Pg[\.:]
  \s{0,2} // anywhere from 0 to 2 spaces
  \d+ // actual page number
  (?:, \d+)? // sometimes there's two page numbers
*/
const INDEX_COURSE_RE = /^([\w\s\(\)\/,'\.:&-]+) ([\dA-Z]+(?:\/[\dA-Z]+)*)(?: ?\(([\w\s]+)\))?\s+Pg[\.:]\s{0,2}\d+(?:, \d+)?$/;
const RIC_COURSE_RE =              /^([\*~^=]*).*?([\dA-Z]+(?:\/[\dA-Z]+)*)(?: ?\([\w\s]+\))?$/;

const unzip = promisify(yauzl.fromBuffer);

const log = new Console(process.stderr, process.stderr);

/**
 * @param {string} courseLine
 */
function sanitizeIndexCourseLine(courseLine) {
  const newChars = [];
  // this is probably faster than doing a bunch of .replace()s
  for (const char of courseLine.split("")) {
    const code = char.charCodeAt(0);

    // ...
    if (code === 0x2026) {
      continue;
    }

    if (code === 0xa0) {
      newChars.push(" ");
    } else if (code === 0x2013) {
      newChars.push("-");
    } else if (code === 0x2019) {
      newChars.push("'");
    } else if (code === 0xfb01) {
      // new ligature just dropped (Scientiﬁc Research and Design)
      newChars.push("fi");
    } else {
      newChars.push(char);
    }
  }

  return newChars.join("");
}

/**
 * @param {string} url
 * @param {string} _previous
 */
function parseDocUrl(url, _previous) {
  try {
    const parsedUrl = new URL(url);
    const match = parsedUrl.pathname.match(DOC_PATH_RE);
    if (match) {
      return match[1];
    } else {
      throw new InvalidArgumentError("Not a Google Docs URL");
    }
  } catch {
    throw new InvalidArgumentError(`Invalid URL`);
  }
}

/**
 * @param {string} docId
 * @param {string} apiKey
 * @returns {Promise<import("domhandler").Document>}
 */
async function downloadDocumentHtml(docId, apiKey) {
  // set up the dom handler/html parser
  const { resolve: domResolve, reject: domReject, promise: domPromise } = Promise.withResolvers();
  let handler = new DomHandler(error => {
    if (error) domReject(error);
    else domResolve(handler.root)
  });
  const parserStream = new WritableStream(handler);

  // download the document
  log.log(`Google Docs: Exporting ${docId} as zip...`);
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${docId}/export?mimeType=application/zip&key=${apiKey}`);
  log.log(`Google Docs: Downloading ${docId}...`);
  const buf = await buffer(res.body);

  // start unzipping the document
  log.log(`Unzipping ${docId}...`);
  const zip = await unzip(buf, { lazyEntries: true });
  zip.readEntry();
  zip.on("entry", entry => {
    if (entry.fileName.endsWith(".html")) {
      // the actual html file
      zip.openReadStream(entry, (err, readStream) => {
        if (err) throw err;
        // parse this entry
        log.log(`Parsing ${docId} HTML...`);
        readStream.pipe(parserStream);
      });
    } else {
      // try the next entry
      zip.readEntry();
    }
  });
 
  return await domPromise;
}

program
  .name("download-courses")
  .description("downloads RRISD course data from course catalog documents")
  .addOption(new Option("--api-key <key>", "Google Drive API key").env("DRIVE_API_KEY").makeOptionMandatory())
  .argument("<course-catalog>", "course catalog document URL", parseDocUrl)
  //.argument("<gpa-ric-list>", "GPA/RIC class list document URL", parseDocUrl)
  .action(async (courseCatalog, { apiKey }) => {
    try {
      //const gpaRicListDoc = await downloadDocumentHtml(gpaRicList, apiKey);
      const courseCatalogDoc = await downloadDocumentHtml(courseCatalog, apiKey);
      const body = courseCatalogDoc.firstChild.lastChild;

      // find the "Index" header (above the course list)
      const indexHeader = dom.findOne(el => el.name === "h1" && dom.innerText(el) === "Index", body.childNodes);
      
      const courses = {};
      
      // start moving through all of the <p>s after the index header
      let currentEl = dom.nextElementSibling(indexHeader);
      while (currentEl?.name === "p") {
        // sanitize and parse the course line
        const text = sanitizeIndexCourseLine(dom.innerText(currentEl).trim());
        if (text) {
          const match = text.match(INDEX_COURSE_RE);
          if (!match) {
            // log a warning if we couldn't parse
            const shorterText = text.replace(/\s+/g, " ");
            console.warn(`WARNING: Failed to parse "${shorterText}"`);
          } else {
            const [, name, ids, annotation] = match;
            // add an entry for each id
            for (const id of ids.split("/")) {
              courses[id] = {
                name,
                annotation
              };
            }
          }
        }
        currentEl = dom.nextElementSibling(currentEl);
      }

      // move on over to the RIC list
      // this does NOT scale but idk what else to do 
      while (!dom.innerText(currentEl).includes("indicates a course that is approved by the NCAA for students with a diagnosed and documented disability to be included in calculating the NCAA GPA")) {
        currentEl = dom.nextElementSibling(currentEl);
      }

      currentEl = dom.nextElementSibling(currentEl);

      // walk through each course line
      while (currentEl?.name === "p") {
        // sanitize and parse the course line
        const text = dom.innerText(currentEl).trim();
        if (text) {
          const match = text.match(RIC_COURSE_RE);
          if (match) {
            const [, modifiers, ids] = match;
            const gpa = modifiers.includes("*");
            const weighted = modifiers.includes("^");

            // Some classes on here are not RRISD gpa classes
            if (gpa) {
              // add an entry for each id 
              for (const id of ids.split("/")) {
                const course = courses[id];
                if (course) {
                  course.gpa = gpa;
                  course.weighted = weighted;
                } else {
                  // This pretty much happens for level III IB of all of the languages
                  console.warn(`WARNING: Unknown course "${text}"`);
                }
              }
            }
          }
        }
        currentEl = dom.nextElementSibling(currentEl);
      }

      console.log(JSON.stringify(courses));
    } catch (err) {
      console.error(err);
    }
  });

program.parse();

