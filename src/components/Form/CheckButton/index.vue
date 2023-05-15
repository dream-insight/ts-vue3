<script setup lang="ts">
import { ref, watch, withDefaults, onMounted } from 'vue'
import type { CheckButtonColors, CheckButtonItem, CheckButtonType } from './types'
import { checkButtonColors } from './types'
import type { RuleFunc } from '../types'

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | string[]): void
  (evemt: 'update:clickIndex', value: number): void
}>()

const props = withDefaults(defineProps<{
  items: CheckButtonItem[]
  name: string
  modelValue?: string | string[]
  // checkbox, radio
  type?: CheckButtonType
  // 전체 버튼 추가
  all?: boolean
  // 최대 체크 가능한 수량
  maxLength?: number
  validate?: RuleFunc[]
  // 강제 에러 출력 - check함수를 수행 하지 않음
  errorMessage?: string
  // button UI 변경
  button?: boolean
  block?: boolean
  color?: CheckButtonColors
  disabled?: boolean
  label?: string
  required?: boolean
}>(), {
  type: 'checkbox',
  all: false,
  maxLength: 0,
  validate: (): RuleFunc[] => [],
  errorMessage: '',
  button: false,
  block: false,
  color: checkButtonColors.primary,
})

let list = ref<CheckButtonItem[]>([])
let val = ref<string | string[]>((props.type === 'checkbox') ? [''] : '')
let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)

watch(() => props.modelValue, (v) => {
  if (v) {
    val.value = v
  }

  resetValidate()
})

watch(val, () => {
  resetValidate()
})

watch(() => props.items, (items) => {
  if (items.length) {
    list.value = [...items]
  }
})

watch(() => props.validate, () => {
  resetValidate()
})

const setIndex = (index: number): void => {
  emit('update:clickIndex', index)
  emit('update:modelValue', val.value)
}

const checkValue = (index: number, v: string): void => {
  setIndex(index)

  if (props.type === 'checkbox') {
    if (v !== '') {
      if (props.maxLength > 0 && Array.isArray(val.value)) {
        val.value.splice(props.maxLength, 1)
      } else {
        if (val.value.indexOf('') > -1 && Array.isArray(val.value)) {
          val.value.splice(0, 1)
        }
      }
    }
  }

  emit('update:modelValue', val.value)
}

/**
 * 폼을 검수하여 값을 반환, 임의로 지정된 에러가 없는 경우
 *
 * @return { Boolean }
*/
const check = (): boolean => {
  // validate check
  if (!props.disabled) {
    if (!props.errorMessage && props.validate.length) {
      for (let i = 0; i < props.validate.length; i++) {
        let result: string | boolean = (props.type === 'checkbox')
          ? props.validate[i](Array.from(val.value))
          : props.validate[i](val.value)

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

    message.value = ''
    isValidate.value = true
  }

  return true
}

const resetValidate = (): void => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
}

const resetForm = (): void => {
  val.value = (props.type === 'checkbox') ? [''] : ''
}

if (props.items) {
  list.value = [...props.items]
}

if (props.all) {
  list.value.unshift({ text: '전체 선택', value: '' })
}

if (props.modelValue) {
  val.value = props.modelValue
}

const feedback = ref<HTMLDivElement>()

onMounted(() => {
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
  <div :class="['check-button', { button, error: message }]">
    <div class="options-wrap">
      <label class="input-label" v-if="props.label">
        {{ props.label }}
        <span class="required" v-if="props.required">*</span>
      </label>
    </div>

    <template v-if="button">
      <div :class="['check-button-group', props.color, { disabled: props.disabled }]">
        <template
          :key="`keyword${i}`"
          v-for="({ text, value }, i) in list">
          <input
            type="checkbox"
            :id="`${name}${i}`"
            :name="name"
            :disabled="props.disabled"
            :value="value"
            @change="checkValue(i, value)"
            v-model="val"
          />

          <label
            :class="{ last: list.length - 1 === i }"
            :for="`${name}${i}`">
            {{ text }}
          </label>
        </template>
      </div>
    </template>
    <template v-else>
      <div
        :class="['origin-check-button', { block: props.block }]"
        :key="'check-button-' + i"
        v-for="({ text, value }, i) in list">
        <label
          :class="[props.color]"
          :for="`${name}${i}`">
          <input
            type="radio"
            :disabled="props.disabled"
            :id="`${name}${i}`"
            :name="name"
            :value="value"
            @change="setIndex(i)"
            v-model="val"
            v-if="type === 'radio'"
          />

          <input
            type="checkbox"
            :id="`${name}${i}`"
            :name="name"
            :disabled="props.disabled"
            :value="value"
            @change="checkValue(i, value)"
            v-model="val"
            v-else
          />

          <template v-if="type === 'radio'">
            <Transition name="check-scale" mode="out-in">
              <i class="mdi mdi-radiobox-marked" v-if="props.modelValue === value"></i>
              <i :class="['mdi', props.disabled ? 'mdi-circle' : 'mdi-radiobox-blank']" v-else></i>
            </Transition>
          </template>
          <template v-else>
            <Transition name="check-scale" mode="out-in">
              <i class="mdi mdi-checkbox-marked" v-if="props.modelValue?.includes(value)"></i>
              <i :class="['mdi', props.disabled ? 'mdi-checkbox-blank' : 'mdi-checkbox-blank-outline']" v-else></i>
            </Transition>
          </template>

          {{ text }}
        </label>
      </div>
    </template>

    <div
      ref="feedback"
      :class="['description', { error: errorTransition }]"
      v-show="message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'CheckButton' }
</script>