<script setup lang="ts">
import { ref, watch, computed, onMounted, withDefaults, useSlots } from 'vue'
import type { StyleValue } from 'vue'
import type { PatternCase, PatternCaseValue, TextFieldType } from './types'
import type { RuleFunc } from '../types';

const slots = useSlots()

const useSlotState: boolean = slots.default ? true : false

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const props = withDefaults(defineProps<{
  modelValue: string
  type?: TextFieldType
  rows?: number | string
  label?: string
  placeholder?: string
  height?: string | number
  width?: string | number
  block?: boolean
  validate?: RuleFunc[]
  blurValidate?: boolean
  pattern?: string
  errorMessage?: string
  maxLength?: number | string
  multiline?: boolean
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
  isCounting?: boolean
  required?: boolean
  hideMessage?: boolean
}>(), {
  rows: 5,
  type: 'text',
  label: '',
  placeholder: '',
  block: false,
  validate: (): RuleFunc[] => [],
  blurValidate: true,
  pattern: '',
  errorMessage: '',
  multiline: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  isCounting: false,
  required: false,
  hideMessage: false,
})

let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)

const Textarea = ref<HTMLTextAreaElement>()
const Input = ref<HTMLInputElement>()

watch(() => props.errorMessage, (v) => {
  // 임의로 지정된 에러가 있는 경우 에러 아이콘 표기
  if (v) {
    message.value = v
    isValidate.value = false
    checkPass.value = false
    errorTransition.value = true
  } else {
    message.value = ''
    isValidate.value = true
    checkPass.value = true
    errorTransition.value = false
  }
})

watch(errorTransition, (v) => {
  if (v) {
    setTimeout((): void => {
      errorTransition.value = false
    }, 300)
  }
})

watch(() => props.modelValue, (v) => {
  // 외부에서 model이 업데이트 되도 유효성 검사
  if (v != '') {
    resetValidate()
  }
})

watch(() => props.validate, () => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
})

const successful = computed<boolean>(() => isValidate.value && checkPass.value)
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

const wrapperStyle = computed<StyleValue>(() => ['input-wrap', {
  'with-label': props.label,
  error: !isValidate,
  success: successful,
  block: props.block
}])
const labelStyle = computed<StyleValue>(() => ['input-label', { error: !isValidate.value }])


const updateValue = (evt: Event): void => {
  const target = evt.target as HTMLInputElement
  emit('update:modelValue', target.value.trim())
}


const getPattern = (): PatternCaseValue | null => {
  const patternCase: PatternCase = {
    // 영문만 유효성 검사
    eng: {
      pattern: /^[a-z|A-Z]+$/,
      message: '영문만 입력 가능합니다.'
    },
    // 영문,숫자 유효성 검사
    engnum: {
      pattern: /^[(a-z|A-Z)0-9]+$/,
      message: '영문, 숫자만 입력 가능합니다.'
    },
    // 아이디 영문,숫자,underbar(_) 사용 유효성 검사
    id: {
      pattern: /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/,
      message: '영문, 숫자 입력만 가능합니다.( _ 중간 사용 가능)'
    },
    // 정수 유효성 검사
    num: {
      pattern: /^[0-9]+$/,
      message: '숫자만 입력 가능합니다.'
    },
    // 영문,숫자 혼합사용 유효성 검사
    wordnum: {
      pattern: /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/,
      message: '영문, 숫자 혼합하여 입력해주세요.'
    },
    password: {
      pattern: /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/,
      message: '영문, 숫자, 특수문자 중 2가지 이상을 조합하여 입력해주세요.(8~16자)'
    },
    // 도메인
    domain: {
      pattern: /^([a-zA-Z0-9]{1,}\.?)[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+(?:\:[0-9]{1,})*$/,
      message: '도메인주소 형식이 일치 하지 않습니다.(http://, https:// 제외)'
    },
    // 이메일 유효성 검사
    email: {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '이메일 형식과 일치하지 않습니다.'
    },
    // 전화 번호 유효성
    tel: {
      pattern: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
      message: '전화번호 형식과 일치하지 않습니다.'
    },
  }

  return (props.pattern in patternCase)
    ? patternCase[props.pattern]
    : null
}

const check = (): boolean => {
  if (props.disabled) {
    return true
  }

  // 임의로 지정된 에러가 없는 경우
  if (props.errorMessage === '') {
    // pattern check
    if (props.pattern) {
      const pt: PatternCaseValue | null = getPattern()

      if (pt !== null) {
        if (pt.pattern.test(props.modelValue)) {
          message.value = ''
        } else {
          message.value = pt.message
          isValidate.value = false
          checkPass.value = false
          errorTransition.value = true

          return false
        }
      }
    }

    // validate check
    if (props.validate.length) {
      for (let i: number = 0; i < props.validate.length; i++) {
        let result: string | boolean = props.validate[i](props.modelValue)

        if (typeof result === 'string') {
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
  }

  errorTransition.value = true

   return false
}

const blurCheck = (): void => {
  if (props.blurValidate) {
    check()
  }
}

const resetForm = (): void => {
  emit('update:modelValue', '')
}

const resetValidate = (): void => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
}

onMounted(() => {
  if (props.autofocus) {
    if (props.multiline) {
      Textarea.value?.focus()
    } else {
      Input.value?.focus()
    }
  }
})

defineExpose({
  focus,
  check,
  resetForm,
  resetValidate
})
</script>

<template>
  <div
    :class="wrapperStyle"
    :style="{ width: styleWidth }"
    @focus="focus">

    <div class="options-wrap">
      <label :class="labelStyle" v-if="props.label">
        {{ props.label }}
        <span class="required" v-if="props.required">*</span>
      </label>
      <div class="counting" v-if="props.isCounting && props.maxLength">
        {{ modelValue.length }} / {{ props.maxLength }}
      </div>
    </div>

    <textarea
      ref="textarea"
      :class="{ 'error': message }"
      :style="[{ height: props.height ? `${props.height}px` : '' }]"
      :rows="props.rows"
      :placeholder="props.placeholder"
      :value="props.disabled ? '' : props.modelValue"
      :readonly="props.readonly"
      :disabled="disabled"
      @blur="blurCheck"
      @input="updateValue"
      v-if="multiline">
    </textarea>

    <div class="with-slot" v-else>
      <input
        ref="input"
        :type="props.type"
        :class="{ 'error': message }"
        :style="[{ width: width ? `${props.width}px` : '' }]"
        :placeholder="props.placeholder"
        :value="props.disabled ? '' : props.modelValue"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :maxlength="props.maxLength"
        @blur="blurCheck"
        @input="updateValue"
      />
      <slot></slot>
    </div>

    <div
      :class="['feedback', { error: errorTransition }]"
      v-if="message && !props.hideMessage">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'TextField' }
</script>