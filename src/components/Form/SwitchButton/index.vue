<script setup lang="ts">
import { ref, watch, computed, withDefaults } from 'vue'

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | boolean): void
}>()
const props = withDefaults(defineProps<{
  modelValue: string | boolean
  small?: boolean
  // [0 => false label, 1 => true label]
  label?: string[]
  // form check validate
  validate?: string | boolean
  trueValue?: string | boolean
  falseValue?: string | boolean
  placeholder?: string
  readonly?: boolean
  checkbox?: boolean
}>(), {
  small: false,
  label: (): string[] => ['미설정', '설정'],
  // form check validate
  validate: false,
  trueValue: true,
  falseValue: false,
  readonly: false,
  checkbox: false,
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
  } else {
    return props.modelValue === props.trueValue ? props.label[1] : props.label[0]
  }
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
  console.log('model update')
  const e = evt.target as HTMLInputElement

  if (!props.readonly) {
    emit('update:modelValue', e.checked ? props.trueValue : props.falseValue)
  } else {
    // 상태가 변경 되지 않도록 처리
    e.checked = !e.checked;
  }
}

defineExpose({
  resetValidate,
  check,
  resetForm
})
</script>

<template>
  <div class="switch-wrap">
    <label
      :class="['switch', { small, checkbox: props.checkbox, error: onError }]">
      <input
        type="checkbox"
        :readonly="props.readonly"
        :checked="props.modelValue == props.trueValue"
        @change="updateValue"
      />

      <template v-if="props.checkbox">
        <Transition name="check-scale" mode="out-in">
          <i class="material-icons" v-if="props.modelValue == props.trueValue">check_box</i>
          <i class="material-icons" v-else>check_box_outline_blank</i>
        </Transition>
      </template>
      <template v-else>
        <span></span>
      </template>

      {{ labelText }}
    </label>

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
export default { name: 'SwitchButton' }
</script>