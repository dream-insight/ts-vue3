<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Selector from './Selector.vue'

const emit = defineEmits<{
  (event: 'set-year', v: number): void
  (event: 'set-month', v: number): void
  (event: 'change-month', v: number): void
}>()
const props = defineProps<{
  isShow: boolean
  maxYear: number
  minYear: number
  year: number
  month: number
}>()

let selectedYear = ref<number>(0)
let selectedMonth = ref<number>(0)
let showYearSelector = ref<boolean>(false)
let showMonthSelector = ref<boolean>(false)

const YearSelector = ref<HTMLElement>()
const MonthSelector = ref<HTMLElement>()

watch(() => props.isShow, bool => {
  if (!bool) {
    showMonthSelector.value = false
    showYearSelector.value = false
  }
})

watch(() => props.year, v => {
  selectedYear.value = v
})

watch(() => props.month, v => {
  selectedMonth.value = v
})

const toggleSelector = (flag: string = 'year'): void => {
  if (flag === 'month') {
    showYearSelector.value = false
    showMonthSelector.value = !showMonthSelector.value
  } else {
    showMonthSelector.value = false
    showYearSelector.value = !showYearSelector.value
  }
}

const setYearMonth = (target: string, value: number): void => {
  if (target === 'year') {
    emit('set-year', value)
  } else {
    emit('set-month', value)
  }
}

const changeMonth = (increase: number): void => {
  emit('change-month', increase)
}

const outsideClickEvent = (evt: Event): void => {
  const target = evt.target as HTMLElement

  if (showYearSelector.value) {
    if (!YearSelector.value?.contains(target)) {
      showYearSelector.value = false
    }
  }

  if (showMonthSelector.value) {
    if (!MonthSelector.value?.contains(target)) {
      showMonthSelector.value = false
    }
  }
}

selectedYear.value = props.year
selectedMonth.value = props.month

onMounted(() => {
  document.addEventListener('click', outsideClickEvent)
})

onUnmounted(() => {
  document.removeEventListener('click', outsideClickEvent)
})
</script>

<template>
  <div class="select-month">
    <i class="material-icons" @click="changeMonth(-12)">keyboard_double_arrow_left</i>
    <i class="material-icons" @click="changeMonth(-1)">keyboard_arrow_left</i>

    <span ref="YearSelector" @click="toggleSelector()">
      {{ year }}년

      <Selector
        :max="maxYear"
        :date="selectedYear"
        :is-show="showYearSelector"
        @selected="setYearMonth('year', $event)"
        @hide="toggleSelector()"
        v-show="showYearSelector"
      />
    </span>
    <span ref="MonthSelector" @click="toggleSelector('month')">
      {{ month + 1 }}월

      <Selector
        date-type="month"
        :date="selectedMonth"
        @selected="setYearMonth('month', $event)"
        @hide="toggleSelector('month')"
        :is-show="showMonthSelector"
        v-show="showMonthSelector"
      />
    </span>

    <i class="material-icons" @click="changeMonth(1)">keyboard_arrow_right</i>
    <i class="material-icons" @click="changeMonth(12)">keyboard_double_arrow_right</i>
  </div>
</template>
