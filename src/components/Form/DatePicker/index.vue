<script setup lang="ts">
import { ref, reactive, watch, computed, withDefaults, onMounted, onUnmounted } from 'vue'
import type {
  ToggleButtonType,
  ShowRange,
  TransitionNameType,
  TimeoutType,
  DateRenderType,
  DateStateType,
  DateOptionType,
  SelectedDateType,
  TimeStateType,
  DateCellType,
  TransitionFlag,
} from './types'
import type { RuleFunc } from '../types'
import DateController from './DateController.vue'

export interface DatePickerEmits {
  (event: 'update:modelValue', value: String[] | String): void
}

export interface DatePickerProps {
  modelValue: string[] | string
  validate?: RuleFunc[]
  label?: string
  placeholder?: string[] | string
  range?: boolean
  separator?: string
  minYear?: number
  maxYear?: number
  block?: boolean
  required?: boolean
  hideMessage?: boolean
  maxRange?: number
  readonly?: boolean
  disabled?: boolean
}

const emit = defineEmits<DatePickerEmits>()

const props = withDefaults(defineProps<DatePickerProps>(), {
  validate: (): RuleFunc[] => [],
  range: false,
  label: '',
  placeholder: '',
  separator: '-',
  minYear: 1900,
  maxYear: Number(new Date().getFullYear()) + 10,
  block: false,
  required: false,
  hideMessage: false,
  maxRange: 0,
  readonly: false,
  disabled: false
})

const el = ref<HTMLElement>()

let isShow = ref<boolean>(false)
let picker = ref<HTMLElement>()
let holderText = ref<string[]>(['', ''])
let nowChecked = ref<number>(0)
let toggleDateButton = ref<ToggleButtonType[]>([
  { text: '오늘', checked: false },
  { text: '어제', checked: false },
  { text: '최근 7일(오늘 포함)', checked: false },
  { text: '최근 7일(오늘 제외)', checked: false },
  { text: '이번 달', checked: false },
  { text: '지난 달', checked: false }
])

const show = reactive<ShowRange>({
  start: true,
  end: true
})

const transitionName = reactive<TransitionNameType>({
  start: 'trans-down',
  end: 'trans-down'
})

const timeout: TimeoutType = {
  start: 0,
  end: 0
}

let curYear = ref<number>(2019)
let curMonth = ref<number>(12)
let curDay = ref<number>(1)

const head: string[] = ['일', '월', '화', '수', '목', '금', '토']

const dateRender = reactive<DateRenderType>({
  start: [],
  end: [],
})

const dateState = reactive<DateStateType>({
  start: {
    year: 2019,
    month: 11,
    day: 1,
  },
  end: {
    year: 2019,
    month: 11,
    day: 1,
  }
})

const opt = reactive<DateOptionType>({
  year: [],
  month: []
})

const selected = reactive<SelectedDateType>({
  start: {
    date: '',
    day: 0
  },
  end: {
    date: '',
    day: 0
  },
})

const timeState = reactive<TimeStateType>({
  start: 0,
  end: 0,
})

let selectedError = ref<string>('')
let message = ref<string | boolean>('')
let onError = ref<boolean>(false)
let errorTransition = ref<boolean>(false)
let isValidate = ref<boolean>(true)

watch([() => selected.start.date, () => selected.end.date], () => {
  resetError()
})

watch(() => props.modelValue, (v) => {
  if (props.range && Array.isArray(v)) {
    selected.start.date = v[0]
    selected.end.date = v[1]
  } else if (typeof v === 'string') {
    selected.start.date = v
  }
})

watch(() => props.validate, () => {
  resetValidate()
})

/**
 * 지정된 포멧에 맞춰서 날짜를 문자열로 변환하여 반환
 * days의 차이에 때라 d 기준 날짜를 가감하여 변환
 *
 * @param d 날짜 객체
 * @param format 변경할 포멧
 * @param days 날짜 가감
 */
 const getDateFormat = (d: Date, format: string, days?: number): string => {
  let date = d

  if (days) {
    const time = date.getTime()
    date = new Date(time + (86400 * days * 1000))
  }

  let year: string = date.getFullYear().toString()
  let month: string = (date.getMonth() + 1).toString()
  let day: string = date.getDate().toString()
  let dYear: string = date.getFullYear().toString()
  let dMonth: string = month.toString()
  let dDay: string = day.toString()

  if (month.length === 1) {
    dMonth = `0${month}`
  }

  if (day.length === 1) {
    dDay = `0${day}`
  }

  return format
    .replace('Y', dYear)
    .replace('m', dMonth)
    .replace('d', dDay)
    .replace('y', year)
    .replace('n', month)
    .replace('j', day)
}

// 시작일 종료일 텍스트 표시 선택된 날짜가 있는 경우 선택된 날짜로 표시
const startDate = computed<string>(() => {
  let v: string = selected.start.date

  if (selected.start.day === 0) {
    v = dateFormat(dateState.start.year, dateState.start.month, dateState.start.day)
  }

  return v
})

const endDate = computed<string>(() => {
  let v: string = selected.end.date

  if (selected.end.day === 0) {
    v = dateFormat(dateState.end.year, dateState.end.month, dateState.end.day)
  }

  return v
})

// 선택된 날짜 기간을 보여준다.
const selectedDateView = computed<string>(() => {
  let v: string = ''

  if (props.range) {
    if (selectedError.value !== '') {
      // 날짜 선택을 잘못한 경우 오류 메시지 표시
      v = selectedError.value
    } else if (selected.start.date !== '' && selected.end.date !== '') {
      v = `${selected.start.date} ~ ${selected.end.date}`
    }
  }

  return v
})

/**
 * 각종 변수 초기화
 */
const init = (): void => {
  const date: Date = new Date()

  curYear.value = date.getFullYear()
  curMonth.value = date.getMonth()
  curDay.value = date.getDate()

  dateState.start.year = date.getFullYear()
  dateState.start.month = date.getMonth()
  dateState.start.day = date.getDate()
  dateState.end.year = date.getFullYear()
  dateState.end.month = date.getMonth()
  dateState.end.day = date.getDate()

  selected.start.date = ''
  selected.end.date = ''
  timeState.start = 0
  timeState.end = 0
}

/**
 * 배치된 위치에 따라 달력이 보여지는 위치와 방향을 변경
 */
const toggleCalendar = (): void => {
  // 달력 표시 전 처리
  const bodyRect: DOMRect = document.body.getBoundingClientRect()
  const rect: DOMRect = el.value!.getBoundingClientRect()
  const pickerWidth: number = props.range ? 480 : 230
  const pickerHeight: number = props.range ? 454 : 280

  if (rect && picker.value) {
    // 객체의 위치가 스크린 아래쪽으로 치우쳤다면 위로 나오게 변경한다.
    if (window.innerHeight < rect.bottom + pickerHeight) {
      picker.value.style.top = ''
      picker.value.style.bottom = '100%'

      if (bodyRect.width / 2 < rect.x) {
        picker.value.style.transformOrigin = 'bottom right'
        picker.value.style.right = '0px'
      } else {
        picker.value.style.transformOrigin = 'bottom left'
        picker.value.style.left = '0px'
      }

    } else {
      picker.value.style.bottom = ''
      picker.value.style.top = 'calc(100% + 5px)'

      if (bodyRect.width / 2 < rect.x) {
        picker.value.style.transformOrigin = 'top right'
        picker.value.style.right = '0px'
      } else {
        picker.value.style.transformOrigin = 'top left'
        picker.value.style.left = '0px'
      }
    }
  }

  if (!props.readonly && !props.disabled) {
    isShow.value = !isShow.value
  }
}

/**
 * 달력 랜더링 기초 데이터 생성
 *
 * @param flag start, end
 */
const makeCanlendar = (flag: string): void => {
  // 달력 생성
  const startWeek: number = new Date(dateState[flag].year, dateState[flag].month, 1).getDay()
  const lastDay: number = new Date(dateState[flag].year, dateState[flag].month + 1, 0).getDate()

  let day: number = 1
  let afterDay: number = 1
  let beforeDay: number = getBeforeDay(dateState[flag].year, dateState[flag].month, startWeek)

  // 달력 총 7일 6줄을 생성한다
  for (let i = 0; i < 6; i++) {
    dateRender[flag][i] = []
  }

  let objData: DateCellType = { day: 0, type: '' }

  for (let j = 0; j < (6 * 7); j++) {
    if (j >= startWeek && day <= lastDay) {
      let formatDate = dateFormat(dateState[flag].year, dateState[flag].month, day)

      if (selected[flag].date === formatDate) {
        objData = { day, type: 'date-start' }
      } else if (dateState[flag].year === curYear.value && dateState[flag].month === curMonth.value && day === curDay.value) {
        objData = { day, type: 'today' }
      } else {
        objData = { day, type: 'current' }
      }

      // 시작 날짜와 끝 날짜 사이에 색상 표시
      if (objData.type !== 'today') {
        if (props.range) {
          let time = new Date(dateState[flag].year, dateState[flag].month, day).getTime()

          // 선택된 날짜 사이의 색상을 변경
          if (selected.start.date && selected.end.date) {
            if (time >= timeState.start && time <= timeState.end) {
              if (flag === 'start' && time > timeState.start) {
                objData.type = 'date-range'
              } else if (flag === 'end' && time < timeState.end) {
                objData.type = 'date-range'
              }
            }
          }

          // 시작일과 종료일 기준으로 선택 할 수 없도록 처리
          if (flag === 'end' && selected.start.date && time < timeState.start) {
            objData.type = 'disabled'
          } else if (flag === 'start' && selected.end.date && time > timeState.end) {
            objData.type = 'disabled'
          }
        }
      }

      day++

    } else if (day > lastDay) {
      objData = { day: afterDay, type: 'afterMonth' }
      afterDay++
    } else if (j < startWeek) {
      objData = { day: beforeDay, type: 'beforeMonth' }
      beforeDay++
    }

    dateRender[flag][Math.floor(j / 7)][j % 7] = objData
  }
}

/**
 * 전달의 마지막 날짜 표시
 *
 * @param year 연도
 * @param month 월
 * @param week 주 0 ~ 6
 */
const getBeforeDay = (year: number, month: number, week: number): number => {
  const day = new Date(year, month, 0).getDate()
  return day - week + 1
}

const resetTransition = (flag: string): void => {
  setTimeout(() => {
    makeCanlendar(flag)
    show[flag] = true
  }, 30)
}

/**
 * 월 변경 이벤트 함수
 *
 * @param flag start | end
 * @param increase 증감 값
 */
const changeMonth = (flag: TransitionFlag, increase: number): void => {
  // 버튼을 통해 달을 변경
  let change: boolean = false

  if (increase === 1 || increase === -1) {
    // 월별 이동 (computed 에서 최종 처리)
    if (dateState[flag].month === 11 && increase > 0) {
      // 지정된 최대 년도보다 높아지지 않도록 처리
      if (dateState[flag].year + 1 < props.maxYear) {
        dateState[flag].month = 0
        dateState[flag].year += 1
        change = true
      }
    } else if (dateState[flag].month === 0 && increase < 0) {
      if (dateState[flag].year - 1 > 1900) {
        dateState[flag].month = 11
        dateState[flag].year -= 1
        change = true
      }
    } else {
      dateState[flag].month += increase
      change = true
    }
  } else {
    // 년 단위 이동
    if (increase === 12 && dateState[flag].year < props.maxYear) {
      dateState[flag].year += 1
      change = true
    } else if (increase === -12 && dateState[flag].year > 1900) {
      dateState[flag].year -= 1
      change = true
    }
  }

  if (change) {
    // transition animate
    if (increase > 0) {
      transitionName[flag] = 'trans-left'
    } else {
      transitionName[flag] = 'trans-right'
    }

    show[flag] = false
  }
}

/**
 * 년도 또는 월 변경
 *
 * @param flag start | end
 * @param target year | month
 * @param value 년도 또는 월
 */
const changeYearMonth = (flag: TransitionFlag, target: string, value: number): void => {
  // 년 월 select box 변경 이벤트
  dateState[flag][target] = value

  // transition animate
  transitionName[flag] = 'trans-down'
  show[flag] = false
}

const pickCaseDate = (flag: number): void => {
  toggleDateButton.value[nowChecked.value].checked = false
  toggleDateButton.value[flag].checked = true

  nowChecked.value = flag

  let date: Date = new Date()

  if (flag === 4) {
    date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  } else if (flag === 5) {
    date = new Date(date.getFullYear(), date.getMonth(), 0)
  }

  let year: string = date.getFullYear().toString()
  let month: string = (date.getMonth() + 1).toString()
  let day: string = date.getDate().toString()

  month = (month.length === 1) ? `0${month}` : month
  day = (day.length === 1) ? `0${day}` : day

  const s = props.separator
  let format = `Y${s}m${s}d`

  switch (flag) {
    case 0:
      selected.start.date = getDateFormat(date, format, 0)
      selected.end.date = getDateFormat(date, format, 0)
      break
    case 1:
      selected.start.date = getDateFormat(date, format, -1)
      selected.end.date = getDateFormat(date, format, -1)
      break
    case 2:
      selected.start.date = getDateFormat(date, format, -6)
      selected.end.date = getDateFormat(date, format, 0)
      break
    case 3:
      selected.start.date = getDateFormat(date, format, -7)
      selected.end.date = getDateFormat(date, format, -1)
      break
    case 4:
    case 5:
      selected.start.date = `${year}${s}${month}${s}01`
      selected.end.date = `${year}${s}${month}${s}${day}`
      break
  }

  // 해당 달력으로 변환
  let start: string[] = selected.start.date.split(s)
  let end: string[] = selected.end.date.split(s)

  dateState.start.year = Number(start[0])
  dateState.start.month = Number(start[1]) - 1
  dateState.start.day = Number(start[2])

  dateState.end.year = Number(end[0])
  dateState.end.month = Number(end[1]) - 1
  dateState.end.day = Number(end[2])

  timeState.start = new Date(dateState.start.year, dateState.start.month, dateState.start.day).getTime()
  timeState.end = new Date(dateState.end.year, dateState.end.month, dateState.end.day).getTime()

  // transition animate
  clearInterval(timeout.start)

  transitionName.start = 'trans-down'
  transitionName.end = 'trans-down'

  show.start = false
  show.end = false

  updateValue()
}

/**
 * 날짜 선택
 * 달력의 2차원 배열에 맞게 전달 값을 받아 날짜 정보 확인 후 처리
 *
 * @param tr 1차 배열 index
 * @param td 2차 배열 index
 * @param flag  start | end
 */
const selectedDay = (tr: number, td: number, flag: string = 'start'): void => {
  selectedError.value = ''

  // 날짜 선택
  const type: string = dateRender[flag][tr][td].type
  const day: number = dateRender[flag][tr][td].day

  if (['current', 'today', 'date-range'].includes(type)) {
    const prevDay = selected[flag].day
    const prevDate = selected[flag].date
    const prevTime = timeState[flag]

    selected[flag].day = day
    selected[flag].date = dateFormat(dateState[flag].year, dateState[flag].month, selected[flag].day)
    timeState[flag] = new Date(dateState[flag].year, dateState[flag].month, selected[flag].day).getTime()

    // 선택 최대 기간이 설정된 경우 날짜를 계산하여 선택이 안되도록 처리
    if (props.maxRange && timeState.start && timeState.end) {
      const term: number = (timeState.end - timeState.start) / (86400 * 1000) + 1

      // 만약 기간이 초과 한다면 변수를 초기화 하고, 다시 랜더링 하지 않는다.
      if (props.maxRange < term) {
        selected[flag].day = prevDay
        selected[flag].date = prevDate
        timeState[flag] = prevTime

        selectedError.value = `최대 선택기간 ${props.maxRange}일을 초과 하였습니다.`

        // 3초 후 메시지 초기화
        setTimeout(() => {
          selectedError.value = ''
        }, 3000)
      }
    }

    // 달력을 다시 그려준다.
    makeCanlendar('start')

    if (props.range) {
      makeCanlendar('end')
    } else {
      emit('update:modelValue', selected.start.date)
      isShow.value = false
    }
  }
}

/**
 * date format string
 *
 * @param year
 * @param month
 * @param day
 */
const dateFormat = (year: number, month: number, day: number): string => {
  const s = props.separator
  let date: string = `${year}${s}`

  date += (month + 1 < 10) ? `0${(month + 1)}${s}` : `${(month + 1)}${s}`
  date += (day < 10) ? `0${day}` : `${day}`

  return date
}

/**
 * 취소 버튼 클릭
 */
const cancel = (): void => {
  resetForm()
  isShow.value = false
}

/**
 * 적용 버튼 클릭
 */
const accept = (): void => {
  updateValue()
  isShow.value = false
}

/**
 * model update
 */
const updateValue = (): void => {
  // 종료 날짜가 시작 날짜보다 작지 않을 경우 데이터 적용
  if (props.range) {
    if (selected.start.date && selected.end.date) {
      emit('update:modelValue', [selected.start.date, selected.end.date])
    } else {
      selected.start.date = ''
      selected.end.date = ''

      emit('update:modelValue', ['', ''])
    }
  } else {
    emit('update:modelValue', selected.start.date)
  }
}

/**
 * 폼 초기화 처리
 */
const resetForm = (): void => {
  init()

  if (props.range) {
    makeCanlendar('start')
    makeCanlendar('end')
    emit('update:modelValue', ['', ''])
  } else {
    makeCanlendar('start')
    emit('update:modelValue', '')
  }
}

/**
 * 유효성 검사 초기화
 */
const resetValidate = (): void => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
}

/**
 * 유효성 에러 처리 초기화
 */
const resetError = (): void => {
  message.value = ''
  onError.value = false
  errorTransition.value = false
  isValidate.value = true
}

/**
 * FormValidate 컴포넌트롤 통한 validation check
 */
const check = (): boolean => {
  // 데이터 검증
  if (props.validate.length && !props.disabled) {
    for (let i = 0; i < props.validate.length; i++) {
      let result1: string | boolean = true
      let result2: string | boolean = true

      if (props.range) {
        result1 = props.validate[i](selected.start.date)
        result2 = props.validate[i](selected.end.date)
      } else {
        result1 = props.validate[i](selected.start.date)
      }

      if (result1 !== true || result2 !== true) {
        message.value = result1
        onError.value = true
        errorTransition.value = true
        isValidate.value = false

        return false
      } else {
        message.value = ''
      }
    }
  }

  return true
}

init()
makeCanlendar('start')

if (props.range) {
  makeCanlendar('end')
}

if (props.placeholder) {
  if (Array.isArray(props.placeholder)) {
    holderText.value =  props.placeholder
  } else if (typeof props.placeholder === 'string') {
    holderText.value[0] = props.placeholder
  }
}

if (props.modelValue) {
  if (props.range) {
    selected.start.date = props.modelValue[0]
    selected.end.date = props.modelValue[1]
  } else if (typeof props.modelValue === 'string') {
    selected.start.date = props.modelValue
  }
}

const outsideClickEvent = (evt: Event): void => {
  if (el.value && isShow.value) {
    const target = evt.target as HTMLElement
    const classList = target.classList.value
    const indexOf1 = classList.indexOf('current')
    const indexOf2 = classList.indexOf('today')
    const indexOf3 = classList.indexOf('date-range')

    if (indexOf1 === -1 && indexOf2 === -1 && indexOf3 === -1) {
      isShow.value = el.value.contains(target)
    }
  }
}


// const scrollEvent = (): void => {
//   if (el.value) {
//     const rect: DOMRect = el.value.getBoundingClientRect()

//     if (picker.value) {
//       picker.value.style.top = `${(rect.top + rect.height + 5)}px`
//     }
//   }
// }

const feedback = ref<HTMLDivElement>()

onMounted(() => {
  // 달력 외의 영역 클릭시 달력 닫기
  document.addEventListener('click', outsideClickEvent)

  // 스크롤 시 달력 닫기
  // document.addEventListener('scroll', scrollEvent)

  feedback.value!.addEventListener('animationend', () => {
    errorTransition.value = false
  })
})

onUnmounted(() => {
  document.removeEventListener('click', outsideClickEvent)
  // document.removeEventListener('scroll', scrollEvent)
})

defineExpose({
  check,
  resetForm,
  resetValidate
})
</script>

<template>
  <div ref="el" :class="['date-picker', { 'with-label': props.label, error: onError, block }]">
    <div class="wrap" @click="toggleCalendar">
      <label :class="{ error: onError }" v-if="props.label">
        {{ props.label }}
        <span class="required" v-if="props.required">*</span>
      </label>

      <div :class="['picker-date-text', { error: message, disabled: props.disabled }]">
        <template v-if="range">
          <input
            readonly
            type="text"
            :class="{ 'error': message }"
            :placeholder="holderText[0]"
            :value="props.disabled ? '' : modelValue[0]"
          />
          <span class="input-group-text">~</span>
          <input
            readonly
            type="text"
            :class="{ 'error': message }"
            :placeholder="holderText[1]"
            :value="props.disabled ? '' : modelValue[1]"
          />

          <i class="mdi mdi-calendar-month"></i>
        </template>

        <template v-else>
          <input
            readonly
            type="text"
            :class="{ 'error': message }"
            :placeholder="holderText[0]"
            :value="props.disabled ? '' : modelValue"
          />
          <i class="mdi mdi-calendar-month"></i>
        </template>
      </div>

      <div
        ref="feedback"
        :class="['feedback', { error: errorTransition }]"
        v-show="message && !props.hideMessage">
        {{ message }}
      </div>
    </div>

    <template v-if="range">
      <Transition name="picker-scale">
        <div ref="picker" class="picker-popup" v-show="isShow">
          <div class="search-date">
            <a
              href="#"
              :class="[v.checked && 'active']"
              :key="v.text" @click.prevent="pickCaseDate(i)"
              v-for="(v, i) in toggleDateButton">
              {{ v.text }}
            </a>
          </div>
          <div class="picker-wrap" tabindex="0">
            <div class="calendar start_calendar">
              <div class="start-end-text">시작일</div>

              <DateController
                :is-show="isShow"
                :year="dateState.start.year"
                :month="dateState.start.month"
                :max-year="maxYear"
                :min-year="minYear"
                @change-month="changeMonth('start', $event)"
                @set-year="changeYearMonth('start', 'year', $event)"
                @set-month="changeYearMonth('start', 'month', $event)"
              />

              <div class="select-calendar-wrap">
                <Transition :name="transitionName.start" @after-leave="resetTransition('start')">
                  <div class="select-calendar" v-show="show.start">
                    <ul class="header">
                      <li
                        :class="{ sun: i === 0, sat: i === 6 }"
                        :key="`start-head-${name}`"
                        v-for="(name, i) in head">
                        {{ name }}
                      </li>
                    </ul>
                    <ul
                      :key="`start-tr-${i}`"
                      v-for="(li, i) in dateRender.start">
                      <li
                        :key="`start-${item.type}-${item.day}`"
                        :class="[item.type, { sun: j === 0, sat: j === 6 }]"
                        @click.prevent="selectedDay(i, j)"
                        v-for="(item, j) in li">
                        {{ item.day }}
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>
            <div class="calendar end_calendar">
              <div class="start-end-text">종료일</div>

              <DateController
                :is-show="isShow"
                :year="dateState.end.year"
                :month="dateState.end.month"
                :max-year="maxYear"
                :min-year="minYear"
                @change-month="changeMonth('end', $event)"
                @set-year="changeYearMonth('end', 'year', $event)"
                @set-month="changeYearMonth('end', 'month', $event)"
              />

              <div class="select-calendar-wrap">
                <Transition :name="transitionName.end" @after-leave="resetTransition('end')">
                  <div class="select-calendar" v-show="show.end">
                    <ul class="header">
                      <li
                        :class="{ sun: i === 0, sat: i === 6 }"
                        :key="`end-head-${name}`"
                        v-for="(name, i) in head" >
                        {{ name }}
                      </li>
                    </ul>
                    <ul
                      :key="`end-tr-${i}`"
                      v-for="(li, i) in dateRender.end">
                      <li
                        :key="`end-${item.type}-${item.day}`"
                        :class="[item.type, { sun: j === 0, sat: j === 6 }]"
                        @click.prevent="selectedDay(i, j, 'end')"
                        v-for="(item, j) in li">
                        {{ item.day }}
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="btn-area">
              <div :class="['select-date', { 'selected-error': selectedError }]">
                {{ selectedDateView }}
              </div>
              <div>
                <a href="#" class="cancel" @click.prevent="cancel">취소</a>
                <a href="#" class="okay" @click.prevent="accept">적용</a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </template>
    <!-------------------------------- 날짜 단일 선택 달력 ---------------------------------->
    <template v-else>
      <Transition name="picker-scale">
        <div ref="picker" class="picker-popup single" v-show="isShow">
          <div class="picker-wrap">
            <div class="calendar-inner">
              <div class="calendar">

                <DateController
                  :is-show="isShow"
                  :year="dateState.start.year"
                  :month="dateState.start.month"
                  :max-year="maxYear"
                  :min-year="minYear"
                  @change-month="changeMonth('start', $event)"
                  @set-year="changeYearMonth('start', 'year', $event)"
                  @set-month="changeYearMonth('start', 'month', $event)"
                />

                <div class="select-calendar-wrap">
                  <Transition :name="transitionName.start" @after-leave="resetTransition('start')">
                    <div class="select-calendar" v-show="show.start">
                      <ul class="header">
                        <li
                          :key="`start-head-${name}`"
                          :class="{ sun: i === 0, sat: i === 6 }"
                          v-for="(name, i) in head">
                          {{ name }}
                        </li>
                      </ul>
                      <ul
                        :key="`start-tr-${i}`"
                        v-for="(li, i) in dateRender.start">
                        <li
                          :key="`start-${item.type}-${item.day}`"
                          :class="[item.type, { sun: j === 0, sat: j === 6 }]"
                          @click.prevent="selectedDay(i, j)"
                          v-for="(item, j) in li">
                          {{ item.day }}
                        </li>
                      </ul>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'DatePicker' }
</script>