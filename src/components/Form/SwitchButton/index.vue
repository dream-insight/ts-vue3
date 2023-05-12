<script setup lang="ts">
import { ref, watch, computed, withDefaults, onMounted } from 'vue'
import { switchButtonColors } from './types'
import type { SwitchButtonColors } from './types'

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | boolean): void
}>()
const props = withDefaults(defineProps<{
  modelValue: string | boolean
  small?: boolean
  label?: string[]    // [0 => false label, 1 => true label]
  validate?: string | boolean
  trueValue?: string | boolean
  falseValue?: string | boolean
  placeholder?: string
  readonly?: boolean
  checkbox?: boolean
  color?: SwitchButtonColors
  disabled?: boolean
}>(), {
  label: (): string[] => ['미설정', '설정'],
  validate: false,
  trueValue: true,
  falseValue: false,
  color: switchButtonColors.primary,
})

let onError = ref<boolean>(false)
let errorTransition = ref<boolean>(false)
let message = ref<string>('')
let isValidate = ref<boolean>(true)

watch(() => props.modelValue, () => {
  resetForm()
})

watch(errorTransition, (v) => {
  if (v) {
    setTimeout(() => {
      errorTransition.value = false
    }, 300)
  }
})

const labelText = computed<string>(() => {
  if (props.checkbox) {
    return props.placeholder ?? ''
  }

  return props.modelValue === props.trueValue ? props.label[1] : props.label[0]
})

const check = (): boolean => {
  // validate check
  if (props.validate) {
    if (props.modelValue === props.trueValue) {
      resetForm()
      return true
    } else {
      message.value = (typeof props.validate == 'string')
        ? props.validate
        : `${props.label[1]}을(를) 선택해주세요.`
      onError.value = true
      isValidate.value = false
      errorTransition.value = true

      return false
    }
  }

  return true
}

const resetForm = (): void => {
  resetValidate()
}

const resetValidate = (): void => {
  message.value = ''
  onError.value = false
  isValidate.value = true
  errorTransition.value = false
}

const updateValue = (evt: Event): void => {
  const e = evt.target as HTMLInputElement

  if (!props.readonly) {
    emit('update:modelValue', e.checked ? props.trueValue : props.falseValue)
  } else {
    // 상태가 변경 되지 않도록 처리
    e.checked = !e.checked;
  }
}

const feedback = ref<HTMLDivElement>()

onMounted(() => {
  feedback.value!.addEventListener('animationend', () => {
    errorTransition.value = false
  })
})

defineExpose({
  resetValidate,
  check,
  resetForm
})
</script>

<template>
  <div :class="['switch-wrap', props.color]">
    <label
      :class="['switch', { small, checkbox: props.checkbox, error: onError }]">
      <input
        type="checkbox"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :checked="props.modelValue == props.trueValue"
        @change="updateValue"
      />

      <template v-if="props.checkbox">
        <Transition name="check-scale" mode="out-in">
          <i class="mdi mdi-checkbox-marked" v-if="props.modelValue == props.trueValue"></i>
          <i class="mdi mdi-checkbox-blank-outline" v-else></i>
        </Transition>
      </template>
      <template v-else>
        <span><i></i></span>
      </template>

      {{ labelText }}
    </label>

    <div
      ref="feedback"
      :class="['feedback', { error: errorTransition }]"
      v-show="message">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'SwitchButton' }
</script>