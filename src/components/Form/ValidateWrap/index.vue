<script setup lang="ts">
import { ref, watch, defineProps, withDefaults } from 'vue'

interface ValidateWrapProps {
  checkValue: any
  validate?: Function[]
  errorMessage?: string
}

const props = withDefaults(defineProps<ValidateWrapProps>(), {
  validate: (): Function[] => [],
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
        let result = props.validate[i].call(null, props.checkValue)

        if (result !== true) {
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

defineExpose({
  check,
  resetForm
})
</script>

<template>
  <div class="validate-wrap">
    <slot></slot>

    <div :class="['error-message']" v-if="message !== ''">
      <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" />
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