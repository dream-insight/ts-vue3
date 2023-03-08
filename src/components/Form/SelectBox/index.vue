<script setup lang="ts">
import { ref, watch, watchEffect, computed, withDefaults, onMounted, StyleValue } from 'vue'
import type { SelectBoxItem } from './types'
import type { RuleFunc } from '../types'

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void,
  (event: 'update:selectedIndex', index: number): void
}>()

const props = withDefaults(defineProps<{
  modelValue: any
  selectedIndex?: number
  options: SelectBoxItem[]
  label?: string
  placeholder?: string
  block?: boolean
  validate?: RuleFunc[]
  errorMessage?: string
  width?: string | number
  multiple?: boolean
}>(), {
  block: false,
  label: '',
  placeholder: '',
  selectedIndex: -1,
  errorMessage: '',
  validate: (): RuleFunc[] => [],
  multiple: false
})

let isValidate = ref<boolean>(true)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)
let showOption = ref<boolean>(false)
let showBottom = ref<boolean>(false)

let selectedText = ref<any>(props.multiple ? [] : '')
let selectedValue = ref<any>(props.multiple ? [] : '')

const SelectBox = ref<HTMLSelectElement>()

const styleWidth = computed<string>(() => {
  if (props.width) {
    let check: boolean = false

    if (typeof props.width === 'string') {
      check = props.width.indexOf('%') > -1
    }

    return check ? props.width.toString() : props.width.toString() + 'px'
  }

  return ''
})

const wrapStyle = computed<StyleValue>(() => ({ 'with-label': props.label, error: !isValidate.value, block: props.block }))

watch(() => props.errorMessage, (v) => {
  if (v) {
    isValidate.value = false
    message.value = props.errorMessage
  }
})

watch(errorTransition, (v) => {
  if (v) {
    setTimeout(() => {
      errorTransition.value = false
    }, 300)
  }
})

watch(() => props.validate, () => {
  resetValidate()
})

watchEffect(() => {
  selectedValue.value = props.modelValue

  if (props.multiple) {
    selectedText.value = []
  }

  props.options.forEach((item) => {
    if (props.multiple) {
      if (props.modelValue.includes(item.value)) {
        selectedText.value.push(item.text)
      }
    } else {
      if (props.modelValue === item.value) {
        selectedText.value = item.text
      }
    }
  })
})

const updateValue = (v: any, index: number): void => {
  emit('update:modelValue', v)
  emit('update:selectedIndex', index)
  check()
}

/**
 * 유효성 검사
 */
const check = (): boolean => {
  // 폼을 검수하여 값을 반환
  // 임의로 지정된 에러가 없는 경우
  // validate check
  if (!props.errorMessage && props.validate.length) {
    for (let i = 0; i < props.validate.length; i++) {
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

  return true
}

/**
 * 폼 value 초기화
 */
const resetForm = (): void => {
  if (props.multiple) {
    selectedText.value = []
    selectedValue.value = []
  } else {
    selectedText.value = ''
    selectedValue.value = ''
  }

  emit('update:modelValue', '')
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
const selectOption = (index: number): void => {
  const { text, value }: SelectBoxItem = props.options[index]

  if (props.multiple) {
    const indexOf: number = selectedValue.value.indexOf(value)

    if (indexOf > -1) {
      // 이미 선택된 값이라면 값 제거
      selectedValue.value.splice(indexOf, 1)
      selectedText.value.splice(indexOf, 1)
    } else {
      selectedValue.value.push(value)
      selectedText.value.push(text)
    }
  } else {
    selectedValue.value = value
    selectedText.value = text
  }

  updateValue(selectedValue.value, index)

  if (!props.multiple) {
    showOption.value = false
  }
}

/**
 * 이미 선택된 옵션인지 판별
 *
 * @param index
 */
const isOptionSelected = (index: number): boolean => {
  const { value }: SelectBoxItem = props.options[index]

  if (props.multiple) {
    return selectedValue.value.includes(value)
  } else {
    return props.modelValue === value
  }
}

const removeSelected = (index: number): void => {
  if (props.multiple) {
    selectedText.value.splice(index, 1)
    selectedValue.value.splice(index, 1)
  }

  updateValue(selectedValue.value, -1)
}

/**
 * 옵션 목록 표시
 */
const toggleOption = (): void => {
  showBottom.value = false

  const windowHeight: number = window.innerHeight
  const rect = SelectBox.value?.getBoundingClientRect() as DOMRect

  if (windowHeight / 2 < rect.top) {
    showBottom.value = true
  }

  showOption.value = !showOption.value
}

/**
 * 본 객체 외의 부분을 클릭할 경우 옵션 목록 숨김
 *
 * @param evt
 */
const outSideClickEvent = (evt: MouseEvent): void => {
  const target = evt.target as HTMLBodyElement

  if (showOption.value) {
    if (!SelectBox.value?.contains(target)) {
      showOption.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', outSideClickEvent)
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
    :class="['select-box', wrapStyle]">

    <label
      :class="['input-label', { error: !isValidate }]"
      v-if="props.label">
      {{ props.label }}
    </label>

    <div
      ref="SelectBox"
      :class="['control-wrap form-control', { 'is-invalid': message }]"
      @click="toggleOption">
      <template v-if="props.multiple">
        <div class="text" v-if="selectedText.length">
          <span
            :key="`selectedItem${i}`"
            v-for="(txt, i) in selectedText">
            {{ txt }}

            <div class="check-mark" @click.stop="removeSelected(i)">
              <div class="mark-wrap">
                <div class="line pipe"></div>
                <div class="line dash"></div>
              </div>
            </div>
          </span>
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
        <i class="fas fa-chevron-down"></i>
      </div>

      <Transition :name="showBottom ? 'options-view-bottom': 'options-view'">
        <ul :class="['option-list', showBottom ? 'show-bottom' : 'show-top' ]" v-show="showOption">
          <li
            :key="`select-${i}`"
            :class="{ selected: isOptionSelected(i) }"
            @click.stop="selectOption(i)"
            v-for="(item, i) in options">
            {{ item.text }}
          </li>
        </ul>
      </Transition>
    </div>

    <div
      :class="['invalid-feedback', { error: errorTransition }]"
      v-if="message">
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