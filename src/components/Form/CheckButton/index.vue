<script setup lang="ts">
import { ref, watch, computed, withDefaults } from 'vue'
import type { CheckButtonItem } from './types'
import type { RuleFunc } from '../types'

const emit = defineEmits<{
  (event: 'update:modelValue', value: any | any[]): void
  (evemt: 'update:clickIndex', value: number): void
}>()

const props = withDefaults(defineProps<{
  items: CheckButtonItem[]
  name: string
  modelValue?: string | string[]
  // checkbox, radio
  type?: string
  // 전체 버튼 추가
  all?: boolean
  // 최대 체크 가능한 수량
  maxCheckLength?: number
  validate?: RuleFunc[]
  // 강제 에러 출력 - check함수를 수행 하지 않음
  errorMessage?: string
  // button UI 변경
  button?: boolean
}>(), {
  type: 'checkbox',
  all: false,
  maxCheckLength: 0,
  validate: (): RuleFunc[] => [],
  errorMessage: '',
  button: false,
})

let list = ref<CheckButtonItem[]>([])
let val = (props.type === 'checkbox') ? ref<any[]>(['']) : ref<any>('')
let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)

watch(() => props.modelValue, (v) => {
    val.value = props.modelValue
    resetValidate()
  }
)

watch(val, () => {
  resetValidate()
})

watch(() => props.items, (items) => {
  if (items.length > 0) {
    list.value = [...items]
  }
})

watch(() => props.validate, () => {
  resetValidate()
})

watch(errorTransition, (v) => {
  if (v) {
    setTimeout(() => {
      errorTransition.value = false
    }, 300)
  }
})

const successful = computed<boolean>(() => isValidate.value && checkPass.value)

const setIndex = (index: number): void => {
  emit('update:clickIndex', index)
  emit('update:modelValue', val.value)
}

const checkValue = (index: number, v: string | number): void => {
  setIndex(index)

  if (props.type === 'checkbox') {
    let model: string[] = ['']

    if (v !== '') {
      if (props.maxCheckLength > 0 && Array.isArray(val.value)) {
        val.value.splice(props.maxCheckLength, 1)
      } else {
        if (val.value.indexOf('') > -1 && Array.isArray(val.value)) {
          val.value.splice(0, 1)
        }
      }

      model = val.value
    }

    val.value = model
  }

  emit('update:modelValue', val.value)
}

/**
 * 폼을 검수하여 값을 반환, 임의로 지정된 에러가 없는 경우
 *
 * @return { Boolean }
*/
const check = (): boolean => {
  if (!props.errorMessage) {
    // validate check
    if (props.validate.length) {
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
  }

  message.value = ''
  isValidate.value = true

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

defineExpose({
  check,
  resetForm,
  resetValidate
})
</script>

<template>
  <div :class="['check-button', { button, error: message }]">
    <template v-if="button">
      <div class="check-button-group">
        <template :key="`keyword${i}`" v-for="({ text, value }, i) in list">
          <input
            type="checkbox"
            class="btn-check"
            :id="`btnCheck${i}`"
            :name="name"
            :value="value"
            @change="checkValue(i, value)"
            v-model="val"
          />

          <label
            :class="{ last: list.length - 1 === i }"
            :for="`btnCheck${i}`">
            {{ text }}
          </label>
        </template>
      </div>
    </template>
    <template v-else>
      <div
        class="form-check form-check-inline"
        :key="'check-button-' + i"
        v-for="({ text, value }, i) in list">
        <input
          type="radio"
          class="form-check-input"
          :id="`${name}${i}`"
          :name="name"
          :value="value"
          @change="setIndex(i)"
          v-model="val"
          v-if="type == 'radio'"
        />

        <input
          type="checkbox"
          class="form-check-input"
          :id="`${name}${i}`"
          :name="name"
          :value="value"
          @change="checkValue(i, value)"
          v-model="val"
          v-else
        />

        <label class="form-check-label" :for="`${name}${i}`">
          {{ text }}
        </label>
      </div>
    </template>

    <div
      :class="['description', { error: errorTransition }]"
      v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'CheckButton' }
</script>