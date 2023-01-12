<script setup lang="ts">
import { ref, watch, computed, defineProps, onMounted, defineEmits, defineExpose, withDefaults } from 'vue'

interface NumberFormatEmits {
  (e: 'update:modelValue', value: number): void
}

interface NumberFormatProps {
  modelValue: number | string;
  placeholder?: string;
  // 폼 검증
  validate?: Function[];
  // 강제 에러 출력 - check함수를 수행 하지 않음
  errorMessage?: string;
  disabled?: boolean;
  block?: boolean;
  width?: string;
  autofocus?: boolean;
  tabIndex?: number | string;
  maxLength?: string | number;
  readonly?: boolean;
}

const emit = defineEmits<NumberFormatEmits>()

const props = withDefaults(defineProps<NumberFormatProps>(), {
  placeholder: '',
  validate: (): Function[] => [],
  errorMessage: '',
  disabled: false,
  block: false,
  autofocus: false,
  tabIndex: 0,
  maxLength: '',
  readonly: false,
})

let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)

const input = ref<HTMLInputElement | null>(null)


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

    if (input.value !== null) {
      input.value.value = format(v)
    }
  }
})

watch(() => props.validate, () => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
})

const successful = computed<boolean>(() => isValidate.value && checkPass.value)

/**
 * 입력 폼이 focus, blur 됐을때 해당 값을 체크 하여 값을 비우거나 0으로 채워 준다.
 *
 *
 * @param { Event } evt
 */
const zeroCheck = (evt: Event) => {
  if (input.value !== null) {
    if (evt.type === 'focus' && input.value.value === '0') {
      input.value.value = ''
      emit('update:modelValue', 0)
    } else if (evt.type === 'blur' && !input.value.value.length) {
      input.value.value = '0'
      emit('update:modelValue', 0)
      check()
    }
  }
}

/**
 * 전달된 값을 천단위로 콤마(,)를 생성하여 반환
 *
 * @param { String } v
 * @return { String } format number string
 */
const format = (v: number | string): string => {
  if (v.toString() === '-') {
    return v.toString()
  } else {
    const value = Number(v)
    console.log('format =========> ', v)
    return new Intl.NumberFormat().format(value)
  }
}

const updateValue = (evt: Event): void => {
  const e = evt.target as HTMLInputElement

  let value: string = e.value.replace(/[^\d\-]/g, '').replace(/\-{2,}/g, '-').replace(/^$/, '')
  value = (value.charAt(0) === '-') ? '-'.concat(value.replace(/[-]/g, '')) : value.replace(/[-]/g, '')

  if (value) {
    e.value = format(value)
    emit('update:modelValue', isNaN(Number(value)) ? 0 : Number(value))
  }
}

const check = (): boolean => {
  // 임의로 지정된 에러가 없는 경우
  if (props.errorMessage === '') {
    // validate check
    if (props.validate.length) {

      for (let i = 0; i < props.validate.length; i++) {
        let result = props.validate[i].call(null, props.modelValue)

        if (result !== true) {
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
  if (input.value !== null) {
    input.value.value = '0'
  }

  emit('update:modelValue', 0)
}

onMounted(() => {
  if (props.autofocus) {
    input.value?.focus()
  }

  if (props.modelValue !== '' && input.value !== null) {
    input.value.value = format(props.modelValue)
  }
})

defineExpose({
  check,
  resetForm
})
</script>

<template>
  <div
    :class="['input-wrap', {error: !isValidate, success: successful, block }]"
    :style="{width: width ? width : ''}">

    <input
      ref="input"
      type="text"
      :style="{ width: width ? width + 'px' : '' }"
      :placeholder="placeholder"
      :tabindex="tabIndex"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxLength"
      @focus="zeroCheck"
      @blur="zeroCheck"
      @input="updateValue"
    />

    <p
      :class="['description', { error: errorTransition }]"
      v-if="message !== ''">
      <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" />
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">
export default {
  name: 'NumberFormat'
}
</script>
