<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits, defineExpose, withDefaults } from 'vue'

interface SwitchButtonEmits {
  (e: 'update:modelValue', value: string | boolean): void
}

interface SwitchButtonProps {
  modelValue: string | boolean
  small?: boolean
  // [0 => false label, 1 => true label]
  label?: string[]
  // form check validate
  validate?: string | boolean
  trueValue?: string | boolean
  falseValue?: string | boolean
}

const emit = defineEmits<SwitchButtonEmits>()
const props = withDefaults(defineProps<SwitchButtonProps>(), {
  small: false,
  label: (): string[] => ['미설정', '설정'],
  // form check validate
  validate: false,
  trueValue: true,
  falseValue: false,
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

const labelText = computed<string>(() => props.modelValue === props.trueValue ? props.label[1] : props.label[0])

const check = (): boolean => {
  // validate check
  if (props.validate) {
    if (props.modelValue === true) {
      resetForm()
      return true
    } else {
      message.value = (typeof props.validate == 'string') ? props.validate : `${props.label[1]}을(를) 선택해주세요.`
      onError.value = true
      isValidate.value = false
      errorTransition.value = true

      return false
    }
  }

  return true
}

const resetForm = (): void => {
  message.value = ''
  onError.value = false
  isValidate.value = true
  errorTransition.value = false
}

const updateValue = (evt: Event): void => {
  const e = evt.target as HTMLInputElement
  emit('update:modelValue', e.checked ? props.trueValue : props.falseValue)
}

defineExpose({
  check,
  resetForm
})
</script>

<template>
  <div class="switch-wrap">
    <label
      :class="['switch', { small, error: onError }]">
      <input
        type="checkbox"
        :checked="modelValue == trueValue"
        @change="updateValue"
      />
      <span></span>
      {{ labelText }}
    </label>

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
  name: 'SwitchButton'
}
</script>