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

selectedYear.value = props.year
selectedMonth.value = props.month

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

onMounted(() => {
  document.addEventListener('click', outsideClickEvent)
})

onUnmounted(() => {
  document.removeEventListener('click', outsideClickEvent)
})
</script>

<template>
  <div class="select-month">
    <button type="button" class="prev2" @click="changeMonth(-12)">
      <span class="arrow-icon fas fa-angle-double-left"></span>
    </button>

    <button type="button" class="prev" @click="changeMonth(-1)">
      <span class="arrow-icon fas fa-angle-left"></span>
    </button>

    <div class="date-text">
      <em ref="YearSelector" @click="toggleSelector()">
        {{ year }}???

        <Selector
          :max="maxYear"
          :date="selectedYear"
          :is-show="showYearSelector"
          @selected="setYearMonth('year', $event)"
          @hide="toggleSelector()"
          v-show="showYearSelector"
        />
      </em>
      <em ref="MonthSelector" @click="toggleSelector('month')">
        {{ month + 1 }}???

        <Selector
          date-type="month"
          :date="selectedMonth"
          @selected="setYearMonth('month', $event)"
          @hide="toggleSelector('month')"
          :is-show="showMonthSelector"
          v-show="showMonthSelector"
        />
      </em>
    </div>

    <button type="button" class="next" @click="changeMonth(1)">
      <span class="arrow-icon fas fa-angle-right"></span>
    </button>

    <button type="button" class="next2" @click="changeMonth(12)">
      <span class="arrow-icon fas fa-angle-double-right"></span>
    </button>
  </div>
</template>
