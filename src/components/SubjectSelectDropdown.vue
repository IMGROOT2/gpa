<template>
  <div
    class="z-10 bg-white rounded-lg shadow p-1 pb-3 w-64 dark:bg-gray-700 fixed"
    :class="{ hidden }"
    :style="{ top: `${x-50}px`, left: `${y}px` }"
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
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search RRISD classes"
        />
      </div>
    </div>
    <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
      <li v-for="result in displayedResults" :key="result.courseId">
        <button
          type="button"
          class="flex flex-col py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left rounded-md"
          @click="$emit('selected', result.courseId)"
        >
          <span>{{ result.name }}</span>
          <span class="text-gray-500 dark:text-gray-400 text-xs">
            #{{ result.courseId }}
            <span v-if="result.annotation"> &bull; {{ result.annotation }}</span>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import rrisdCoursesData from '../assets/rrisd-courses.json'
import Fuse from 'fuse.js'
import { ref, watch } from 'vue'

defineEmits(['selected'])

const props = defineProps({
  hidden: Boolean,
  x: Number,
  y: Number
})

const searchInputValue = ref('')
/** @type {import("vue").Ref<{
    name: string;
    courseId: string;
    weighted: boolean;
    gpa: boolean;
    annotation: string;
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
    }
  }
)
</script>
