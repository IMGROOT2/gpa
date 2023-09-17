<!-- One or more icons in this file belong to Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->

<template>
  <tr
    class="border-b dark:bg-gray-800 dark:border-gray-700 transition-opacity"
    :class="{ 'opacity-25 hover:opacity-100': !course.g }"
  >
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
    >
      {{ course.n }}
      <span
        class="inline-flex items-center justify-center w-6 h-6 ml-2 text-sm font-semibold bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300"
        title="Affects GPA"
        v-if="course.g"
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

      <span
        class="inline-flex items-center justify-center w-6 h-6 ml-2 text-sm font-semibold bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-300"
        title="Weighted (6.0)"
        v-if="course.w"
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

      <button
        ref="dropdownButton"
        type="button"
        @click.stop="onDropdownButtonClick"
        class="ml-2 flex-shrink-0 inline-flex justify-center w-6 h-6 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-3 h-3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <span class="sr-only">Select course</span>
      </button>
    </th>
    <td class="px-6 py-4">
      <input
        type="number"
        class="w-16 text-center text-gray-900 dark:text-white bg-transparent rounded-md border-none p-0.5"
        min="0"
        max="100"
        :value="average"
        @input="$emit('update:average', $event.target.valueAsNumber)"
      />
    </td>
    <td class="px-6 py-4 justify-between flex">
      <input
        type="number"
        class="w-16 text-center text-gray-900 dark:text-white bg-transparent rounded-md border-none p-0.5"
        min="0.5"
        max="2"
        step="0.25"
        :value="credits"
        @input="$emit('update:credits', $event.target.valueAsNumber)"
      />
      <span
        class="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold bg-red-100 text-red-800 hover:bg-red-700 dark:hover:bg-red-800 rounded-full dark:bg-red-900 dark:text-red-300"
        title="Remove course"
        @click="$emit('remove-class')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          class="w-2.5 h-2.5"
          fill="currentColor"
        >
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
          />
        </svg>
        <span class="sr-only">Remove course</span>
      </span>
    </td>
  </tr>
</template>
<script setup>
import rrisdCourses from '../assets/rrisd-courses.json'
import { ref, computed } from 'vue'

const props = defineProps({
  courseId: String,
  average: Number,
  credits: Number
})

/** @type {import("vue").Ref<HTMLButtonElement>} */
const dropdownButton = ref()

const emit = defineEmits(['select-course', 'update:average', 'update:credits', 'remove-class'])

const course = computed(() => rrisdCourses.find((el) => el.i === props.courseId))

function onDropdownButtonClick() {
  const boundingBox = dropdownButton.value.getBoundingClientRect()
  emit('select-course', boundingBox.left, boundingBox.top + boundingBox.height)
}
</script>
