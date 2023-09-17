<!-- One or more icons in this file belong to Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->

<template>
  <main class="bg-zinc-900 w-full grid h-screen place-items-center">
    <div class="overflow-x-hidden w-full mx-auto flex items-center justify-center h-full">
      <div class="relative p-4 w-full lg:max-w-screen-xl h-full md:h-auto">
        <div
          class="relative p-4 bg-white rounded-lg dark:bg-gray-800 md:p-8 shadow-2xl shadow-[#0d817f]"
        >
          <div class="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            <h3 class="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
              RRISD GPA Calculator
            </h3>
            <p class="text-md font-semibold text-gray-700 dark:text-white mb-5 lg:mb-8">
              Calculate and re-calculate your GPA with ease!
            </p>
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
                    :course-id="course.courseId"
                    v-model:average="course.average"
                    v-model:credits="course.credits"
                    :key="i"
                    @select-course="(top, left) => onSelectCourse(i, top, left)"
                    @remove-class="courses.splice(i, 1)"
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
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:w-auto sm:flex-shrink-0"
              >
                <span class="fill-white relative top-[1px] mr-1"
                  ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                    /></svg
                ></span>
                New Course
              </button>
            </div>
            <div>
              <div class="rounded-md shadow-sm mr-2 p-2 text-center inline-block">
                <p class="weighted-text text-4xl text-emerald-500">{{ weightedGPA.toFixed(3) }}</p>
                <p class="text-white text-sm">Weighted GPA</p>
              </div>
              <div class="rounded-md shadow-sm p-2 text-center inline-block">
                <p class="text-4xl text-blue-500">{{ unweightedGPA.toFixed(3) }}</p>
                <p class="text-white text-sm">Unweighted GPA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <SubjectSelectDropdown v-bind="dropdownOptions" @selected="onDropdownSelected" />
  </main>
</template>
<script setup>
import Class from './components/Class.vue'
import TableHead from './components/TableHead.vue'
import Footer from './components/Footer.vue'
import { onMounted, onUnmounted, ref, computed } from 'vue'
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

function saveCourses() {
  localStorage.setItem('saved-courses', JSON.stringify(courses.value))
}

function getGPA(qualityPoints) {
  return (
    qualityPoints.reduce((prev, current) => prev + current, 0) /
    relevantCourses.value.reduce((prev, current) => prev + current.credits, 0)
  )
}

const relevantCourses = computed(() => {
  return courses.value
    .map(({ courseId, average, credits }) => ({
      average,
      credits,
      ...rrisdCourses.find((a) => a.i === courseId)
    }))
    .filter((el) => el.g)
})

const weightedGPA = computed(() => {
  const qualityPoints = relevantCourses.value.map(
    (el) => ((el.w ? 6 : 5) - (100 - el.average) / 10) * el.credits
  )
  return getGPA(qualityPoints)
})

const unweightedGPA = computed(() => {
  const qualityPoints = relevantCourses.value.map(
    (el) => (4 - (100 - el.average) / 10) * el.credits
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
  }
}

function onDropdownSelected(courseId) {
  dropdownOptions.value.hidden = true
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
