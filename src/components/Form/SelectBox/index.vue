<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits, defineExpose, withDefaults } from 'vue'
import type { SelectBoxItem } from './types'

interface SelectBoxEmits {
  (e: 'update:modelValue', value: string): void,
  (e: 'update:selectedIndex', index: number): void
}

interface SelectBoxProps {
  modelValue: string;
  selectedIndex?: number;
  options: SelectBoxItem[];
  placeholder?: string;
  block?: boolean;
  validate?: Function[];
  errorMessage?: string;
  width?: string | number;
}

const emit = defineEmits<SelectBoxEmits>()

const props = withDefaults(defineProps<SelectBoxProps>(), {
  block: false,
  selectedIndex: -1,
  errorMessage: '',
  validate: (): Function[] => [],
})

let val = ref<string>('')
let isValidate = ref<boolean>(true)
let message = ref<string>('')
let errorTransition = ref<boolean>(false)
let selectBox = ref<HTMLSelectElement | null>(null)

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

watch(() => props.errorMessage, (v) => {
  if (v !== '') {
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
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
})

const getText = (): string => {
  return props.options[props.selectedIndex].text
}

const updateValue = (evt: Event): void => {
  let e = evt.target as HTMLSelectElement
  emit('update:modelValue', e.value)
  emit('update:selectedIndex', e.selectedIndex)
  check()
}

const check = (): boolean => {
  // 폼을 검수하여 값을 반환
  // 임의로 지정된 에러가 없는 경우
  if (!props.errorMessage) {
    // validate check
    if (props.validate.length) {
      const e = selectBox.value

      if (e) {
        for (let i = 0; i < props.validate.length; i++) {
          let result = props.validate[i].call(null, e.value)

          if (result !== true) {
            message.value = result
            isValidate.value = false
            errorTransition.value = true

            return false
          }
        }
      }
    }
  }

  message.value = ''
  isValidate.value = true

  return true
}

const resetForm = (): void => {
  if (!props.placeholder) {
    val.value = props.options[0].value
  } else {
    val.value = ''
  }

  emit('update:modelValue', val.value)
}

if (props.modelValue !== '') {
  val.value = props.modelValue
} else {
  if (props.placeholder === '') {
    // placeholder가 없는 경우 옵션의 첫번째 값을 기본으로 잡아줌
    emit('update:modelValue', props.options[0].value)
  }
}

defineExpose({
  getText,
  check,
  resetForm
})
</script>

<template>
  <div
    :style="{ width: styleWidth }"
    :class="['select-box', 'ml-1', { error: !isValidate, block }]">
    <select
      ref="selectBox"
      @change="updateValue">
      <option
        value=""
        :selected="modelValue == ''"
        v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
        :value="item.value"
        :selected="modelValue == item.value"
        :key="'select-' + i"
        v-for="(item, i) in options">
        {{ item.text }}
      </option>
    </select>

    <p
      :class="['description', { error: errorTransition }]"
      v-if="!isValidate">
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
  name: 'SelectBox'
}
</script>