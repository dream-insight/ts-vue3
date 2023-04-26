<script setup lang="ts">
import { ref, watch, withDefaults, onUnmounted } from 'vue'
import type { ToastIconCase, ToastColorCase } from './types'
import { toastIconCase, toastColorCase } from './types'

interface ToastListType {
  key: number
  color: ToastColorCase
  icon: ToastIconCase
  message: string
}

const props = withDefaults(defineProps<{
  delay?: number
  maxShowMessage?: number
  destroy: Function
}>(), {
  delay: 300,
  maxShowMessage: 4
})

let color = ref<ToastColorCase>(toastColorCase.success)
let icon = ref<ToastIconCase>(toastIconCase.success)
let message = ref<string>('')

let list = ref<ToastListType[]>([])
let timeout: number[] = []
let key: number = 0

watch(list, (items) => {
  if (!items.length) {
    key = 0
    timeout = []
  }
})

const show = (): void => {
  list.value.push({
    key,
    color: color.value,
    icon: icon.value,
    message: message.value,
  })

  // 표시 시간이 지나면 자동으로 메시지 삭제
  timeout.push(setTimeout((): void => {
    hide(0)
  }, props.delay))

  key++

  const len: number = list.value.length

  if (len > props.maxShowMessage) {
    hide(0)
  }
}

const hide = (index: number = 0): void => {
  try {
    clearTimeout(timeout[list.value[index].key])

    if (list.value.length > 0) {
      list.value.splice(index, 1)
    }
  } catch (e) { }
}

onUnmounted(() => {
  props.destroy()
})

defineExpose({
  show,
  message,
  icon,
  color
})
</script>

<template>
  <div id="toast">
    <TransitionGroup name="toast-view">
      <div
        :class="['toast-body', (item.color ? `bg-${item.color}` : '')]"
        :key="`toast-${item.key}`"
        @click="hide(i)"
        v-for="(item, i) in list">

        <template v-if="item.icon">
          <i class="icon material-icons">{{ item.icon }}</i>
        </template>

        <span class="message">{{ item.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>