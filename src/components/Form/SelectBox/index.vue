<script setup lang="ts">
import { ref, watch, computed, withDefaults, onMounted, StyleValue } from 'vue'
import type { SelectBoxItem } from './types'
import type { RuleFunc } from '../types'

export interface SelectBoxEmits {
  (event: 'update:modelValue', value: any): void,
  (event: 'update:selectedIndex', index: number): void
}

export interface SelectBoxProps {
  modelValue: string | string[]
  options: SelectBoxItem[]
  label?: string
  placeholder?: string
  block?: boolean
  validate?: RuleFunc[]
  errorMessage?: string
  width?: string | number
  multiple?: boolean
  readonly?: boolean
  disabled?: boolean
  required?: boolean
  isShort?: boolean
  btnAccept?: boolean
  labelText?: boolean
  maxLength?: number
  searchable?: boolean
  hideMessage?: boolean
}

const emit = defineEmits<SelectBoxEmits>()

const props = withDefaults(defineProps<SelectBoxProps>(), {
  block: false,
  label: '',
  placeholder: '',
  errorMessage: '',
  validate: (): RuleFunc[] => [],
  multiple: false,
  readonly: false,
  disabled: false,
  required: false,
  isShort: false,
  btnAccept: false,
  labelText: false,
  maxLength: 0,
  searchable: false,
  hideMessage: false,
})

let isValidate = ref<boolean>(true)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)
let showOption = ref<boolean>(false)
let showBottom = ref<boolean>(false)

let selectedText = ref<any>(props.multiple ? [] : '')
let selectedValue = ref<any>(props.multiple ? [] : '')

const optionList = ref<SelectBoxItem[]>([])
let isSelectAll = ref<boolean>(false)

const SelectBox = ref<HTMLSelectElement>()
const searchInput = ref<HTMLInputElement>()

watch(() => props.errorMessage, (v) => {
  if (v) {
    isValidate.value = false
    message.value = props.errorMessage
  }
})

watch(() => props.validate, () => {
  resetValidate()
})

watch(() => props.modelValue, () => {
  // 초기 modelValue 바로 대입할시 selectedValue의 값이 modelValue 메모리를 참조
  // 다중선택(btnAccept) 적용 버튼을 만족 시키기 위해 구조분해 할당 적용
  if (Array.isArray(props.modelValue)) {
    selectedValue.value = [...props.modelValue]
  }

  if (props.multiple) {
    selectedText.value = []
  }

  props.options.forEach((item) => {
    if (props.multiple && props.modelValue instanceof Array) {
      if (props.modelValue.includes(item.value as never)) {
        selectedText.value.push(item.text)
      }
    } else {
      if (props.modelValue === item.value) {
        selectedText.value = item.text
      }
    }
  })
})

watch(() => props.options, () => {
  optionList.value = [...props.options]
})

const styleWidth = computed<string>(() => {
  if (typeof props.width === 'string') {
    return props.width
  } else if (typeof props.width === 'number') {
    return `${props.width}px`
  }

  return ''
})

const wrapperStyle = computed<StyleValue>(() => ({ 'with-label': props.label, error: !isValidate.value, block: props.block }))

const updateValue = (v: string | string[]): void => {
  emit('update:modelValue', v)
  check()
}

/**
 * 유효성 검사
 */
const check = (): boolean => {
  if (!props.disabled) {
    // 폼을 검수하여 값을 반환
    // 임의로 지정된 에러가 없는 경우
    // validate check
    if (!props.errorMessage && props.validate.length) {
      for (let i: number = 0; i < props.validate.length; i++) {
        let result: string | boolean = props.validate[i](selectedValue.value)

        if (typeof result === 'string') {
          message.value = result
          isValidate.value = false
          errorTransition.value = true

          return false
        }
      }
    }

    message.value = ''
    isValidate.value = true
  }

  return true
}

/**
 * 폼 value 초기화
 */
const resetForm = (): void => {
  if (props.multiple) {
    selectedText.value = []
    selectedValue.value = []

    emit('update:modelValue', '')
  } else {
    selectedText.value = ''
    selectedValue.value = ''

    emit('update:modelValue', [])
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
 * options 항목 선택 이벤트
 *
 * @param index
 */
const selectOption = (v: any): void => {
  let index = -1

  const [{ text }] = optionList.value.filter((item, i) => {
    if (item.value == v) {
      index = i
      return true
    }
  })

  if (props.multiple) {
    const indexOf: number = selectedValue.value.indexOf(v)

    if (indexOf > -1) {
      // 이미 선택된 값이라면 값 제거
      selectedValue.value.splice(indexOf, 1)
      selectedText.value.splice(indexOf, 1)
    } else {
      selectedValue.value.push(v)
      selectedText.value.push(text)
    }
  } else {
    selectedValue.value = v
    selectedText.value = text
  }

  if (!props.btnAccept) {
    updateValue(selectedValue.value)
  }

  if (!props.multiple) {
    toggleOption()
  }
}

/**
 * 이미 선택된 옵션인지 판별
 *
 * @param index
 */
const isOptionSelected = (v: any): boolean => {
  if (props.multiple) {
    return selectedValue.value.includes(v)
  }

  return props.modelValue === v
}

const removeSelected = (index: number): void => {
  if (props.multiple) {
    selectedText.value.splice(index, 1)
    selectedValue.value.splice(index, 1)
  }

  if (!props.btnAccept) {
    updateValue(selectedValue.value)
  }
}

/**
 * 전체 선택
 */
const selectAll = (): void => {
  if (props.multiple) {
    isSelectAll.value = !isSelectAll.value

    selectedText.value = []
    selectedValue.value = []

    if (isSelectAll.value) {
      optionList.value.forEach(item => {
        selectedText.value.push(item.text)
        selectedValue.value.push(item.value)
      })

      if (!props.btnAccept) {
        updateValue([...selectedValue.value])
      }
    }
  }
}

/**
 * 옵션 목록 표시
 */
const toggleOption = (): void => {
  if (!props.disabled) {
    showBottom.value = false

    const windowHeight: number = window.innerHeight
    const rect: DOMRect = SelectBox.value!.getBoundingClientRect()

    if (windowHeight / 2 < rect.top) {
      showBottom.value = true
    }

    showOption.value = !showOption.value

    if (showOption.value) {
      if (props.searchable) {
        searchInput.value!.value = ''
      }

      optionList.value = [...props.options]
    }
  }
}

let timeout: number = 0

// props.searchable 적용시
const searchText = (evt: KeyboardEvent): void => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    const { value } = evt.target as HTMLInputElement

    if (value) {
      optionList.value = props.options.filter(({ text }) => text.indexOf(value) > -1)
    } else {
      optionList.value = [...props.options]
    }
  }, 300)
}


// props.isAccept 적용시
const accept = (): void => {
  showOption.value = false
  updateValue(selectedValue.value)
}

/**
 * 본 객체 외의 부분을 클릭할 경우 옵션 목록 숨김
 *
 * @param evt
 */
const outSideClickEvent = (evt: MouseEvent): void => {
  const target = evt.target as HTMLBodyElement

  if (showOption.value) {
    if (!SelectBox.value!.contains(target)) {
      // 적용 버튼 활성화시 적용 버튼을 클릭하지 않고 창을 닫을 경우
      // 값을 전으로 돌려 준다.
      if (props.btnAccept) {
        selectedText.value = []
        selectedValue.value = []

        props.options.forEach(item => {
          if (props.modelValue.includes(item.value)) {
            selectedText.value.push(item.text)
          }
        })

        selectedValue.value = [...props.modelValue]

        updateValue([...selectedValue.value])
      }

      toggleOption()
    }
  }
}

optionList.value = [...props.options]

const feedback = ref<HTMLDivElement>()

onMounted(() => {
  document.addEventListener('click', outSideClickEvent)

  // feedback message 트랜지션 초기화
  feedback.value!.addEventListener('animationend', () => {
    errorTransition.value = false
  })
})

defineExpose({
  check,
  resetForm,
  resetValidate
})
</script>

<template>
  <div
    :style="{ width: styleWidth }"
    :class="['select-box', wrapperStyle]">

    <div class="options-wrap">
      <label
        :class="['input-label', { error: !isValidate }]"
        v-if="props.label">
        {{ props.label }}

        <span class="required" v-if="props.required">*</span>
      </label>
    </div>

    <div
      ref="SelectBox"
      :class="['control-wrap', { disabled: props.disabled, 'error': message }]"
      @click="toggleOption">
      <template v-if="props.multiple">
        <div
          :class="['text', { scroll: props.multiple }]"
          v-if="selectedText.length">
          <template v-if="props.labelText">
            <template v-if="!props.isShort">
              <span
                :key="`selectedItem${i}`"
                v-for="(txt, i) in selectedText">
                {{ txt }}
                <i class="remove-icon material-icons" @click.stop="removeSelected(i)">close</i>
              </span>
            </template>
            <template v-else>
              <span>{{ selectedText[0] }}</span>

              <template v-if="selectedText.length > 1">
                &nbsp; + {{ selectedText.length - 1 }}
              </template>
            </template>
          </template>
          <template v-else>
            <template v-if="!props.isShort">
              {{ selectedText.join(', ') }}
            </template>
            <template v-else>
              {{ selectedText[0] }}
              <template v-if="selectedText.length > 1">
                + {{ selectedText.length - 1 }}
              </template>
            </template>
          </template>
        </div>
        <div class="text ph" v-else>
          {{ props.placeholder }}
        </div>
      </template>
      <template v-else>
        <div class="text" v-if="selectedText">
          {{ selectedText }}
        </div>
        <div class="text ph" v-else>
          {{ props.placeholder }}
        </div>
      </template>

      <div :class="['arrow', { rotate: showOption }]">
        <i class="material-icons">expand_more</i>
      </div>

      <Transition :name="showBottom ? 'options-view-bottom' : 'options-view'">
        <div :class="['option-list', showBottom ? 'show-bottom' : 'show-top']" v-show="showOption">
          <div class="search" @click.stop v-if="props.searchable">
            <div class="search-wrap">
              <input ref="searchInput" type="text" @keydown="searchText">
              <span class="material-icons">search</span>
            </div>
          </div>
          <ul>
            <li
              @click.stop="selectAll"
              v-if="props.multiple && !props.maxLength">
              <span class="checkbox material-icons">
                {{ isSelectAll ? 'check_box' : 'check_box_outline_blank' }}
              </span>
              {{ isSelectAll ? '전체 해제' : '전체 선택' }}
            </li>
            <template v-if="optionList.length">
              <li
                :key="`select-${item.value}`"
                :class="{ selected: isOptionSelected(item.value) }"
                @click.stop="selectOption(item.value)"
                v-for="(item, i) in optionList">
                <template v-if="props.multiple">
                  <span class="checkbox material-icons">
                    {{ isOptionSelected(item.value) ? 'check_box' : 'check_box_outline_blank' }}
                  </span>
                </template>
                {{ item.text }}
              </li>
            </template>
            <template v-else>
              <li @click.stop>검색된 내용이 없습니다.</li>
            </template>
          </ul>
          <a
            href="#"
            class="btn-accept"
            @click.stop.prevent="accept"
            v-if="props.btnAccept">
            적용 + {{ selectedValue.length }}
          </a>
        </div>
      </Transition>
    </div>

    <div
      ref="feedback"
      :class="['feedback', { error: errorTransition }]"
      v-show="message && !props.hideMessage">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'SelectBox' }
</script>