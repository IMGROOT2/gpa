import { InvalidArgumentError, Option, program } from "commander";
import DomHandler from "domhandler";
import yauzl from "yauzl";
import { WritableStream } from "htmlparser2/lib/WritableStream";
import { buffer } from "node:stream/consumers";
import { promisify } from "node:util";
import * as dom from "domutils";
import { Console } from "console";
import { createReadStream } from "node:fs";

const DOC_PATH_RE = /^\/document\/d\/([\w-]+)\//;

/*
  so I decided to comment this monstrosity
  // course name
  (
    [
      \w\s // letters, numbers, spaces
      () // parens
      / // slash
      ,'.:&- // random symbols
    ]+
  )
    
  // course ID
  (
    [\dA-Z]+ // numbers and capital letters
    // zero or more additional course IDs
    (?:
      /
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
  Pg[.:]
  \s{0,2} // anywhere from 0 to 2 spaces
  \d+ // actual page number
  (?:, \d+)? // sometimes there's two page numbers
*/
const INDEX_COURSE_RE = /^([\w\s()/,'.:&-]+) ([\dA-Z]+(?:\/[\dA-Z]+)*)(?: ?\(([\w\s]+)\))?\s+Pg[.:]\s{0,2}\d+(?:, \d+)?$/;
const RIC_COURSE_RE =              /^([*~^=]*).*?([\dA-Z]+(?:\/[\dA-Z]+)*)(?: ?\([\w\s]+\))?$/;
const STYLE_COLOR_RE = /color:\s*#([a-zA-Z0-9]+)/;

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

async function readDocumentHtml(fileName) {
  // set up the dom handler/html parser
  const { resolve: domResolve, reject: domReject, promise: domPromise } = Promise.withResolvers();
  let handler = new DomHandler(error => {
    if (error) domReject(error);
    else domResolve(handler.root)
  });
  const parserStream = new WritableStream(handler);
  createReadStream(fileName).pipe(parserStream);
  return await domPromise;
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
  .addOption(new Option("--api-key <key>", "Google Drive API key").env("DRIVE_API_KEY"))
  .argument("<course-catalog>", "course catalog file path")
  //.argument("<gpa-ric-list>", "GPA/RIC class list document URL", parseDocUrl)
  .action(async (courseCatalog) => {
    try {
      //const gpaRicListDoc = await downloadDocumentHtml(gpaRicList, apiKey);
      //const courseCatalogDoc = await downloadDocumentHtml(courseCatalog, apiKey);
      const courseCatalogDoc = await readDocumentHtml(courseCatalog);
      const body = courseCatalogDoc.firstChild.lastChild;

      // find the "Index" header (above the course list)
      const indexHeader = dom.findOne(el => dom.innerText(el) === "Index", body.childNodes);
      const courses = {};
      
      // parse the table after
      let tableEl = dom.nextElementSibling(indexHeader);
      
      // TABLE FORMAT THE REGEX ISNT NEEDED
      for (const row of tableEl.children.slice(1)) {
        // finally

        const name = dom.innerText(row.children[0]).trim();
        const ids = dom.innerText(row.children[1]);
        
        for (const id of ids.split("/")) {
          courses[id] = {
            name
          };
        }
      }

      // move on over to the RIC list
      // this does NOT scale but idk what else to do 
      const ricHeader = dom.findOne(el => dom.innerText(el).includes("approved for NCAA GPA calculation"), body.childNodes);

      let table = dom.nextElementSibling(dom.nextElementSibling(ricHeader));
      // walk through each course line
      while (table?.name === "table") {
        for (const row of table.children.slice(2)) {
          let ids = dom.innerText(row.children[1]);
          let name = dom.innerText(row.children[0]).trim();

          // random replacement idk
          name = name.replace("Journalism,", "Journalism");

          //id incorrect
          if (name == "Spanish IV Advanced") ids = "8443";
          const classOf2627 = dom.innerText(row.children[2]).trim() == 'X';
          const classOf28 = dom.innerText(row.children[3]).trim() == 'X';
          const weighted = dom.innerText(row.children[4]).trim() == 'X';
          const dualCredit = name.toLowerCase().includes("onramps") || name.toLowerCase().includes("dual credit") || name.toLowerCase().includes("dual enrollment");

          if (!(classOf2627 || classOf28)) {
            console.warn(`WARNING: Course "${name}" does not count to RRISD GPA but is NCAA approved`);
            continue;
          }

          let firstYear = undefined, lastYear = undefined;
          if (classOf2627 && !classOf28) lastYear = 2027;
          if (classOf28 && !classOf2627) firstYear = 2028;
        
        
          for (const id of ids.split("/")) {
            const normId = id.replace(" ", '');
            let course = courses[normId];
            if (!course) {
              // try to lookup by name
              course = Object.values(courses).find(el => el.name.trim().toLowerCase() == name.toLowerCase());

              if (course) {
                // found by name
                console.warn(`WARNING: Course not found by ID but found by name: "${name}"/${id}`);
              }
            }
            
            if (course) {
              if (course.gpa) {
                console.warn(`WARNING: Overwriting course "${name}" with id ${id}`);
              }
              
              course.gpa = true;
              course.weighted = weighted;
              course.firstYear = firstYear;
              course.lastYear = lastYear;
              course.dualCredit = dualCredit;
            } else {
              // This pretty much happens for level III IB of all of the languages
              console.warn(`WARNING: Unknown course "${name}" with id ${id}`);
              courses[normId] = {
                name,
                weighted,
                firstYear,
                lastYear,
                gpa: true,
                dualCredit
              };
            }
          }
        }
            
        table = dom.nextElementSibling(table);
        while (table?.name === "p" && dom.innerText(table).trim().length === 0) table = dom.nextElementSibling(table);
      }

      console.log(JSON.stringify(courses));
    } catch (err) {
      console.error(err);
    }
  });

program.parse();

