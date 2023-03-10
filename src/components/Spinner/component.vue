<script setup lang="ts">
import { ref } from 'vue'

export interface SpinnerProps {
  limitTime?: number
  destroy: Function
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  limitTime: 10,
})

let timeout: number = 0
let delay = ref<number>(0.5)
let progress = ref<number>(0)
let isShow = ref<boolean>(false)
let message = ref<string>('Loading...')

const destroy = (): void => {
  props.destroy()
}

const waiting = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay.value * 1000)
  })
}

const setProgress = async (flag: string): Promise<void> => {
  if (flag === '+') {
    progress.value++
  } else {
    progress.value--
  }

  await waiting()

  if (progress.value) {
    isShow.value = true

    // 스피너가 닫히지 않고 limitTime 이상 유지 될 경우 강제로 콘솔 메시지를 표시한다.
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      console.warn('스피너가 닫지히 않습니다. 처리되고 있는 내역을 확인해주세요.')
      progress.value = 0
      isShow.value = false
    }, props.limitTime * 1000)
  } else {
    progress.value = 0
    isShow.value = false
  }
}

const show = (msg: string): void => {
  if (msg !== '') {
    message.value = msg
  }

  setProgress('+')
}

const hide = (): void => {
  setProgress('-')
}

defineExpose({
  show,
  hide,
  delay
})
</script>

<template>
  <Transition appear name="fade">
    <div class="spinner-box" v-show="isShow">
      <Transition appear name="scale" @after-leave="destroy">
        <div class="box" v-show="isShow">
          <div class="spinner-border text-white" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <p>{{ message }}</p>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
