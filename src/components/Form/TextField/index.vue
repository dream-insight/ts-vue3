<script setup lang="ts">
import { ref, watch, computed, onMounted, withDefaults } from 'vue'
import type { StyleValue } from 'vue'
import type { TextFieldType, TextPatternCase } from './types'
import type { KeyIndex, RuleFunc } from '../types'

export interface TextFieldProps {
  modelValue: string
  type?: TextFieldType
  rows?: number
  label?: string
  placeholder?: string
  height?: string | number
  width?: string | number
  block?: boolean
  validate?: RuleFunc[]
  blurValidate?: boolean
  pattern?: TextPatternCase
  errorMessage?: string
  maxLength?: number
  multiline?: boolean
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
  isCounting?: boolean
  required?: boolean
  hideMessage?: boolean
  icon?: string
  iconLeft?: boolean
}

export interface TextFieldEmits {
  (event: 'update:modelValue', value: string): void
}

const emit = defineEmits<TextFieldEmits>()

const props = withDefaults(defineProps<TextFieldProps>(), {
  rows: 5,
  type: 'text',
  label: '',
  placeholder: '',
  validate: (): RuleFunc[] => [],
  blurValidate: true,
  errorMessage: '',
  maxLength: 0,
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

watch(() => props.validate, () => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
})

watch(() => props.modelValue, (v) => {
  // 외부에서 model이 업데이트 되도 유효성 검사
  if (props.modelValue != '') {
    resetValidate()
  }
})

const successful = computed<boolean>(() => isValidate.value && checkPass.value)
const styleWidth = computed<string>(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else if (typeof props.width === 'string') {
    return `${props.width}`
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
const inputStyleClass = computed<StyleValue>(() => [
  {
    'error': message.value,
    'left-space': props.icon && props.iconLeft,
    'right-space': props.icon && !props.iconLeft,
  }
])


const updateValue = (evt: Event): void => {
  const target = evt.target as HTMLInputElement

  // textarea maxlength 기능이 없기 때문에 코드로 구현
  if (props.isCounting && props.maxLength) {
    if (target.value.length > props.maxLength) {
      const cut = target.value.substring(0, props.maxLength)
      target.value = cut
    }
  }

  emit('update:modelValue', target.value.trim())
}

const check = (): boolean => {
  if (props.disabled) {
    return true
  }

  // 임의로 지정된 에러가 없는 경우
  if (props.errorMessage === '') {
    // pattern check
    if (props.pattern) {
      const patterns: KeyIndex<[RegExp, string]> = {
        eng: [
          /^[a-z|A-Z]+$/,
          '영문만 입력 가능합니다.'
        ],
        engnum: [/^[(a-z|A-Z)0-9]+$/, '영문, 숫자만 입력 가능합니다.'],
        // 아이디 영문,숫자,underbar(_) 사용 유효성 검사
        id: [
          /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/,
          '영문, 숫자 입력만 가능합니다.( _ 중간 사용 가능)'
        ],
        num: [
          /^[0-9]+$/,
          '숫자만 입력 가능합니다.'
        ],
        // 영문,숫자 혼합사용 유효성 검사
        wordnum: [
          /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/,
          '영문, 숫자 혼합하여 입력해주세요.'
        ],
        password: [
          /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/,
          '영문, 숫자, 특수문자 중 2가지 이상을 조합하여 입력해주세요.(8~16자)'
        ],
        domain: [
          /^([a-zA-Z0-9]{1,}\.?)[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+(?:\:[0-9]{1,})*$/,
          '도메인주소 형식이 일치 하지 않습니다.(http://, https:// 제외)'
        ],
        email: [
          /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          '이메일 형식과 일치하지 않습니다.'
        ],
        tel: [
          /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
          '전화번호 형식과 일치하지 않습니다.'
        ],
      }

      const [regExp, errMsg] = patterns[props.pattern]

      if (regExp) {
        if (regExp.test(props.modelValue)) {
          message.value = ''
        } else {
          message.value = errMsg
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

const feedback = ref<HTMLDivElement>()

onMounted(() => {
  if (props.autofocus) {
    if (props.multiline) {
      Textarea.value?.focus()
    } else {
      Input.value?.focus()
    }
  }

  // feedback 메시지 animation 제어 (흔들리는 애니메이션이 종료되면 해당 트랜지션 트리거 변수를 초기화 한다)
  feedback.value!.addEventListener('animationend', () => {
    errorTransition.value = false
  })
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
      :style="[{ height: props.height && `${props.height}px` }]"
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
        :class="inputStyleClass"
        :style="[{ width: width ? `${props.width}px` : '' }]"
        :placeholder="props.placeholder"
        :value="props.disabled ? '' : props.modelValue"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :maxlength="props.maxLength > 0 ? props.maxLength : ''"
        @blur="blurCheck"
        @input="updateValue"
      />
      <template v-if="props.icon">
        <span :class="['mdi', props.icon, { left: props.iconLeft }]"></span>
      </template>
      <slot></slot>
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
export default { name: 'TextField' }
</script>