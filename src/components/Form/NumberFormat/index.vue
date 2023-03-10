<script setup lang="ts">
import { ref, watch, computed, onMounted, withDefaults } from 'vue'
import type { RuleFunc } from '../types'

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const props = withDefaults(defineProps<{
  modelValue: number | string
  label?: string
  placeholder?: string
  validate?: RuleFunc[]
  errorMessage?: string
  disabled?: boolean
  block?: boolean
  width?: string
  autofocus?: boolean
  maxLength?: string | number
  readonly?: boolean
}>(), {
  label: '',
  placeholder: '',
  validate: (): RuleFunc[] => [],
  errorMessage: '',
  disabled: false,
  block: false,
  autofocus: false,
  maxLength: '',
  readonly: false,
})

let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)

const Input = ref<HTMLInputElement>()

watch(() => props.errorMessage, (v) => {
  // 임의로 지정된 에러가 있는 경우 에러 아이콘 표기
  if (v != '') {
    message.value = v
    isValidate.value = false
    errorTransition.value = true
  } else {
    message.value = ''
    isValidate.value = true
    errorTransition.value = false
  }
})

watch(errorTransition, (v) => {
  if (v) {
    setTimeout(() => {
      errorTransition.value = false
    }, 300)
  }
})

watch(() => props.modelValue, (v) => {
  // 외부에서 model이 업데이트 되도 유효성 검사
  if (v !== '') {
    message.value = ''
    isValidate.value = true
    errorTransition.value = false

    if (Input.value) {
      Input.value.value = format(v)
    }
  }
})

watch(() => props.validate, () => {
  resetValidate()
})

const successful = computed<boolean>(() => isValidate.value && checkPass.value)

/**
 * 입력 폼이 focus, blur 됐을때 해당 값을 체크 하여 값을 비우거나 0으로 채워 준다.
 *
 * @param { Event } evt
 */
const zeroCheck = (evt: Event) => {
  if (Input.value) {
    if (evt.type === 'focus' && Input.value.value === '0') {
      Input.value.value = ''
      emit('update:modelValue', 0)
    } else if (evt.type === 'blur' && !Input.value.value.length) {
      Input.value.value = '0'
      emit('update:modelValue', 0)
      check()
    }
  }
}

/**
 * 전달된 값을 천단위로 콤마(,)를 생성하여 반환
 *
 * @param v
 * @return format number string
 */
const format = (v: number | string): string => {
  if (v === '-') {
    return v
  } else {
    return new Intl.NumberFormat().format(Number(v))
  }
}

const updateValue = (evt: Event): void => {
  const e = evt.target as HTMLInputElement

  let value: string = e.value.replace(/[^\d\-]/g, '').replace(/\-{2,}/g, '-').replace(/^$/, '')
  value = (value.charAt(0) === '-') ? '-'.concat(value.replace(/[-]/g, '')) : value.replace(/[-]/g, '')

  if (value) {
    e.value = format(value)
    emit('update:modelValue', isNaN(Number(value)) ? 0 : Number(value))
  } else {
    e.value = ''
  }
}

const check = (): boolean => {
  // 임의로 지정된 에러가 없는 경우
  if (!props.errorMessage) {
    // validate check
    if (props.validate.length) {
      for (let i: number = 0; i < props.validate.length; i++) {
        let result: string | boolean = props.validate[i](props.modelValue)

        if (typeof result !== 'boolean') {
          message.value = result
          isValidate.value = false
          checkPass.value = false
          errorTransition.value = true

          return false
        } else {
          message.value = ''
        }
      }
    }

    isValidate.value = true
    checkPass.value = true

    return true
  } else {
    errorTransition.value = true
    return false
  }
}

const resetForm = (): void => {
  if (Input.value) {
    Input.value.value = '0'
  }

  emit('update:modelValue', 0)
}

const resetValidate = (): void => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
}

onMounted(() => {
  if (props.autofocus && Input.value) {
    Input.value.focus()
  }

  if (props.modelValue && Input.value) {
    Input.value.value = format(props.modelValue)
  }
})

defineExpose({
  check,
  resetForm,
  resetValidate
})
</script>

<template>
  <div
    :class="['input-wrap', { 'with-label': props.label, error: !isValidate, success: successful, block: props.block }]"
    :style="{ width: width ?? '' }">

    <label :class="['input-label', { error: !isValidate }]" v-if="props.label">
      {{ props.label }}
    </label>

    <input
      ref="Input"
      type="text"
      :class="['form-control', { 'is-invalid': message }]"
      :style="{ width: width ? width + 'px' : '' }"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :maxlength="props.maxLength"
      @focus="zeroCheck"
      @blur="zeroCheck"
      @input="updateValue"
    />

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
export default { name: 'NumberFormat' }
</script>
