<!-- One or more icons in this file belong to Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->

<template>
  <main class="w-full flex items-center justify-center lg:h-screen">
    <div class="overflow-x-hidden w-full mx-auto flex items-center justify-center lg:mt-14">
      <div class="relative p-4 w-full lg:max-w-screen-xl h-full md:h-auto">
        <div
          class="relative p-4 bg-white rounded-lg dark:bg-gray-800 md:p-8 shadow-2xl shadow-[#0d817f]"
        >
          <div class="flex flex-row justify-between">
            <div class="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
              <h3 class="mb-3 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                RRISD GPA Calculator
              </h3>
              <p class="text-md font-semibold text-gray-700 dark:text-white">
                Calculate and re-calculate your GPA with ease!
              </p>
            </div>
            <div class="text-right">
              <div>
                <div class="mb-1">
                  <p class="text-gray-900 dark:text-white inline font-semibold text-xs sm:text-md">
                    Affects GPA
                  </p>
                  <span
                    class="inline-flex items-center justify-center w-6 h-6 ml-2 text-sm font-semibold bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300"
                    title="Affects GPA"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      class="w-2.5 h-2.5"
                      fill="currentColor"
                    >
                      <path
                        d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z"
                      />
                    </svg>
                    <span class="sr-only">Affects GPA</span>
                  </span>
                </div>
              </div>
              <div>
                <p class="text-gray-900 dark:text-white inline font-semibold text-xs sm:text-md">
                  Weighted (6.0)
                </p>
                <span
                  class="inline-flex items-center justify-center w-6 h-6 ml-2 text-sm font-semibold bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-300"
                  title="Weighted (6.0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    class="w-2.5 h-2.5"
                    fill="currentColor"
                  >
                    <path
                      d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"
                    />
                  </svg>
                  <span class="sr-only">Weighted (6.0)</span>
                </span>
              </div>
            </div>
          </div>

          <div class="mb-5 lg:mb-8 max-w-xs">
            <label
              for="input-graduation-year"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >Graduation Year</label
            >
            <p class="mb-1 text-xs text-gray-500 dark:text-gray-400">
              Needed for the Class of 2028 GPA class changes.
            </p>
            <input
              type="number"
              id="input-graduation-year"
              class="w-16 text-center text-gray-900 dark:text-white bg-gray-400/25 rounded-md border-none p-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              v-model.number="graduationYear"
            />
          </div>

          <div
            class="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0 mb-5 lg:mb-8"
          >
            <div class="relative overflow-x-auto w-full rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <TableHead />
                <tbody>
                  <Class
                    v-for="(course, i) in courses"
                    :course="{ courseId: course.courseId, ...processedCourses[course.courseId] }"
                    v-model:average="course.average"
                    v-model:credits="course.credits"
                    :key="course.courseId"
                    @select-course="(top, left) => onSelectCourse(i, top, left)"
                    @remove-class="courses.splice(i, 1) && saveCourses()"
                    @input="saveCourses"
                  />
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0 justify-between flex-row mx-auto font-bold"
          >
            <div>
              <button
                type="button"
                @click="addCourse"
                :disabled="courses.length >= 9 ? true : false"
                :class="
                  courses.length >= 9
                    ? 'cursor-not-allowed opacity-50 bg-red-600 hover:bg-red-600'
                    : 'bg-sky-600 hover:bg-sky-600 focus:ring-sky-500'
                "
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:flex-shrink-0"
              >
                <span class="fill-white relative top-[1px] mr-1" v-show="courses.length < 9"
                  ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                    /></svg
                ></span>
                {{ courses.length >= 9 ? 'Max 9 courses' : 'Add a course' }}
              </button>
            </div>
            <div class="flex justify-center">
              <div class="rounded-md shadow-sm mr-2 p-2 text-center inline-block">
                <p class="weighted-text text-4xl text-emerald-500">{{ weightedGPA.toFixed(3) }}</p>
                <p class="text-gray-800 dark:text-white text-sm">Weighted GPA</p>
              </div>
              <div class="rounded-md shadow-sm p-2 text-center inline-block">
                <p class="text-4xl text-blue-500">{{ unweightedGPA.toFixed(3) }}</p>
                <p class="text-gray-800 dark:text-white text-sm">Unweighted GPA</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
    <SubjectSelectDropdown v-bind="dropdownOptions" @selected="onDropdownSelected" />
  </main>
</template>
<script setup>
import Class from './components/Class.vue'
import TableHead from './components/TableHead.vue'
import Footer from './components/Footer.vue'
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import SubjectSelectDropdown from './components/SubjectSelectDropdown.vue'
import rrisdCourses from './assets/rrisd-courses.json'

const dropdownOptions = ref({
  hidden: true,
  x: 0,
  y: 0
})

const courses = ref(
  JSON.parse(localStorage.getItem('saved-courses')) ?? [
    {
      courseId: '1112', // The first course (English 1)
      average: 100,
      credits: 0.5
    }
  ]
)

const graduationYear = ref(parseInt(localStorage.getItem('graduation-year') ?? 2027))

watch(graduationYear, (newYear) => {
  localStorage.setItem('graduation-year', newYear.toString())
})

function saveCourses() {
  localStorage.setItem('saved-courses', JSON.stringify(courses.value))
}

function getGPA(qualityPoints) {
  return (
    qualityPoints.reduce((prev, current) => prev + current, 0) /
    relevantCourses.value.reduce((prev, current) => prev + current.credits, 0)
  )
}

// apply the graduation year filters
const processedCourses = computed(() =>
  Object.fromEntries(
    Object.entries(rrisdCourses).map(([id, course]) => {
      if (course.gpa) {
        // the user isn't eligible for this to be a GPA course
        if (
          (course.firstYear && graduationYear.value < course.firstYear) ||
          (course.lastYear && graduationYear.value > course.lastYear)
        ) {
          return [
            id,
            {
              ...course,
              gpa: false,
              weighted: false,
              notEligible: true
            }
          ]
        } else {
          return [id, course]
        }
      } else {
        // no changes for non-gpa courses
        return [id, course]
      }
    })
  )
)

const relevantCourses = computed(() => {
  return courses.value
    .map(({ courseId, average, credits }) => ({
      courseId,
      average: Math.min(100, Math.max(0, Number.isNaN(average) ? 100 : average)),
      credits: Math.max(0, credits || 0.5),
      ...processedCourses.value[courseId]
    }))
    .filter((el) => el.gpa)
})

const weightedGPA = computed(() => {
  const qualityPoints = relevantCourses.value.map(
    (el) => calculateWeightedHonorPoints(el.average, el.weighted) * el.credits
  )
  return getGPA(qualityPoints)
})

function calculateWeightedHonorPoints(average, advanced) {
  if (average < 70) return 0 // doesn't matter if it's advanced
  const maxPoints = advanced ? 6 : 5
  const deductedPoints = (100 - average) / 10
  return maxPoints - deductedPoints
}

function calculateUnweightedHonorPoints(average) {
  // just hardcoding it the algorithm doesn't make sense mathematically
  if (average >= 90) return 4
  else if (average >= 80) return 3
  else if (average >= 70) return 2
  else return 0
}

const unweightedGPA = computed(() => {
  const qualityPoints = relevantCourses.value.map(
    (el) => calculateUnweightedHonorPoints(el.average) * el.credits
  )
  return getGPA(qualityPoints)
})

const currentSelectingCourse = ref(-1)

function onDocumentClick() {
  dropdownOptions.value.hidden = true
}

/**
 * @param {StorageEvent} e
 */
function onStorage(e) {
  if (e.key === 'saved-courses') {
    courses.value = JSON.parse(e.newValue)
  } else if (e.key === 'graduation-year') {
    graduationYear.value = parseInt(e.newValue)
  }
}

function onDropdownSelected(courseId) {
  dropdownOptions.value.hidden = true
  console.log(courses.value, currentSelectingCourse.value)
  courses.value[currentSelectingCourse.value].courseId = courseId
  currentSelectingCourse.value = -1
  saveCourses()
}

function onSelectCourse(i, top, left) {
  currentSelectingCourse.value = i
  dropdownOptions.value = {
    hidden: false,
    x: left,
    y: top
  }
}

function addCourse() {
  courses.value.push({ courseId: '1112', average: 100, credits: 0.5 })
  saveCourses()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  addEventListener('storage', onStorage)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  removeEventListener('storage', onStorage)
})
</script>
