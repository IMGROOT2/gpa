<template>
  <div
    class="z-10 bg-white rounded-lg shadow-xl p-1 pb-3 w-80 sm:w-96 dark:bg-gray-700 fixed border dark:border-gray-600"
    :class="{ hidden }"
    :style="{ top: `${x - 50}px`, left: `${y}px` }"
    @click.stop
  >
    <div class="p-3">
      <label for="search-subjects" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchInputValue"
          type="text"
          id="search-subjects"
          ref="searchInput"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search RRISD classes"
          autocomplete="off"
        />
      </div>
    </div>
    <ul class="h-64 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
      <li v-for="result in displayedResults" :key="result.courseId">
        <button
          type="button"
          class="flex flex-col w-full py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left rounded-md transition-colors"
          @click="$emit('selected', result.courseId)"
        >
          <div class="flex items-center justify-between w-full">
            <span class="font-medium truncate mr-2">{{ result.name }}</span>
            <div class="flex flex-shrink-0 space-x-1">
               <span
                class="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-violet-100 text-violet-800 rounded-full dark:bg-violet-900 dark:text-violet-300"
                title="Weighted (6.0)"
                v-if="result.weighted"
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
              </span>
              <span
                class="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300"
                title="Dual Credit / OnRamps"
                v-if="result.dualCredit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  class="w-2.5 h-2.5"
                  fill="currentColor"
                >
                  <path
                    d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <span class="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
            #{{ result.courseId }}
            <span v-if="result.annotation"> &bull; {{ result.annotation }}</span>
          </span>
        </button>
      </li>
      <li v-if="displayedResults.length === 0" class="py-4 text-center text-gray-500 dark:text-gray-400">
        No courses found
      </li>
    </ul>
  </div>
</template>

<script setup>
import rrisdCoursesData from '../assets/rrisd-courses.json'
import Fuse from 'fuse.js'
import { ref, watch, nextTick } from 'vue'

defineEmits(['selected'])

const props = defineProps({
  hidden: Boolean,
  x: Number,
  y: Number
})

const searchInputValue = ref('')
const searchInput = ref(null)

/** @type {import("vue").Ref<{
    name: string;
    courseId: string;
    weighted: boolean;
    gpa: boolean;
    annotation: string;
    dualCredit?: boolean;
}[]>} */
const displayedResults = ref([])
let searchTimeout = -1


const courses = Object.entries(rrisdCoursesData).map(([k, v]) => ({ courseId: k, ...v }))

const fuse = new Fuse(courses, {
  keys: ['name', 'courseId'],
  threshold: 0.3
})

function search() {
  const results = fuse.search(searchInputValue.value)
  displayedResults.value = results.map((el) => el.item)

  if (searchInputValue.value === '') {
    displayedResults.value = courses
  }
}

displayedResults.value = courses

watch(searchInputValue, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => search(), 250)
})
watch(
  () => props.hidden,
  (newVal) => {
    if (newVal) {
      searchInputValue.value = ''
    } else {
      nextTick(() => {
        searchInput.value?.focus()
      })
    }
  }
)
</script>
