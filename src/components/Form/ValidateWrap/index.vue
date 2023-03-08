<script setup lang="ts">
import { ref, watch, withDefaults } from 'vue'
import type { RuleFunc } from '../types'

export interface ValidateWrapProps {
  checkValue: any
  validate?: RuleFunc[]
  errorMessage?: string
}

const props = withDefaults(defineProps<ValidateWrapProps>(), {
  validate: (): RuleFunc[] => [],
  errorMessage: '',
})

watch(() => props.checkValue, () => {
  resetForm()
})

watch(() => props.validate, () => {
  resetForm()
})

watch(() => props.errorMessage, (v) => {
  message.value = v
})

let isValidate = ref<boolean>(true)
let checkPass = ref<boolean>(false)
let message = ref<string>('')

const check = (): boolean => {
  // 임의로 지정된 에러가 없는 경우
  if (props.errorMessage === '') {
    // validate check
    if (props.validate.length) {
      for (let i = 0; i < props.validate.length; i++) {
        let result = props.validate[i](props.checkValue)

        if (typeof result === 'string') {
          message.value = result
          isValidate.value = false
          checkPass.value = false

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

  return false
}

const resetForm = (): void => {
  isValidate.value = true
  checkPass.value = false
  message.value = ''
}

const resetValidate = (): void => {
  resetForm()
}

defineExpose({
  check,
  resetForm,
  resetValidate
})
</script>

<template>
  <div class="validate-wrap">
    <slot></slot>

    <div :class="['error-message']" v-if="message !== ''">
      {{ message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'ValidateWrap' }
</script>