<script setup lang="ts">
import { ref, watch, computed, defineEmits, defineProps, defineExpose, withDefaults } from 'vue'

interface CheckButtonEmits {
  (e: 'update:modelValue', value: any | any[]): void
  (e: 'update:clickIndex', value: number): void
}

interface CheckButtonItems {
  text: string
  value: string
}

interface CheckButtonProps {
  modelValue: any | any[]
  clickIndex?: number
  items: CheckButtonItems[]
  name: string
  // checkbox, radio
  type?: string
  // 전체 버튼 추가
  all?: boolean
  // 최대 체크 가능한 수량
  maxCheck?: number
  validate?: Function[]
  // 강제 에러 출력 - check함수를 수행 하지 않음
  errorMessage?: string
  // button UI 변경
  button?: boolean
}

const emit = defineEmits<CheckButtonEmits>()

const props = withDefaults(defineProps<CheckButtonProps>(), {
  clickIndex: -1,
  type: 'checkbox',
  all: false,
  maxCheck: 0,
  validate: (): Function[] => [],
  errorMessage: '',
  button: false,
})

let list = ref<CheckButtonItems[]>([])
let val = (props.type === 'checkbox') ? ref<any | any[]>(['']) : ref<string>('')
let clickIndex = ref<number>(-1)
let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)

watch(() => props.modelValue, (v) => {
    val.value = props.modelValue
    resetValidate()
  }
)

watch(val, (v) => {
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
  emit('update:clickIndex', clickIndex.value)
  emit('update:modelValue', val.value)
}

const checkValue = (index: number, v: any | any[]): void => {
  setIndex(index)

  if (props.type === 'checkbox') {
    let model = ['']

    if (v !== '') {
      if (props.maxCheck > 0) {
        val.value.splice(props.maxCheck, 1)
      } else {
        if (val.value.indexOf('') > -1) {
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
        let result = ''

        if (props.type == 'checkbox') {
          result = props.validate[i].call(null, Array.from(val.value))
        } else {
          result = props.validate[i].call(null, val.value)
        }

        if (!result) {
          message.value = result
          isValidate.value = false
          errorTransition.value = true

          return false
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
  val.value = (props.type == 'checkbox') ? [''] : ''
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
  <div :class="['check-button', { button }]">
    <template v-if="button">
      <label
        style="{ marginTop: '5px' }"
        :key="`keyword${i}`" v-for="({ text, value }, i) in list">
        <input
          type="checkbox"
          :name="name"
          :value="value"
          @change="checkValue(i, value)"
          v-model="val"
        />
        <span>{{ text }}</span>
      </label>
    </template>
    <template v-else>
      <label
        :key="'check-button-' + i"
        v-for="({ text, value }, i) in list">
        <input
          type="radio"
          :id="`${name}${i}`"
          :name="name"
          :value="value"
          @change="setIndex(i)"
          v-model="val"
          v-if="type == 'radio'"
        />

        <input
          type="checkbox"
          :id="`${name}${i}`"
          :name="name"
          :value="value"
          @change="checkValue(i, value)"
          v-model="val"
          v-else
        />

        {{ text }}
      </label>
    </template>

    <p
      :class="['description', { error: errorTransition }]"
      v-if="message !== '' || successful">
      <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" />
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'CheckButton' }
</script>