<script setup lang="ts">
import { ref, watch, onBeforeUpdate, defineProps, defineExpose, withDefaults } from 'vue'

export interface SpinnerProps {
  limitTime?: number
  destroy: Function
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  limitTime: 10,
})

let timeout: number = 0
let delay = ref<number>(0)
let progress = ref<number>(0)
let isShow = ref<boolean>(false)
let isOpen = ref<boolean>(false)
let message = ref<string>('Loading...')

watch(progress, (after) => {
  if (after <= 0) {
    delay.value = 0
    isShow.value = false
  } else if (after > 0) {
    isShow.value = true
  }
})

 const destroy = (): void => {
  isOpen.value = false
  props.destroy.call(null)
}

 const waiting = (): Promise<null> => {
  return new Promise<null>((resolve: Function): void => {
    setTimeout(() => {
      resolve(null)
    }, delay.value * 1000)
  })
}

 const show = async (msg: string) => {
  if (msg !== '') {
    message.value = msg
  }

  clearTimeout(timeout)

  await waiting()

  isOpen.value = true
  progress.value++

  // hide 호출이 없을 경우 최대 지속 시간 이후 사라지도록
  timeout = setTimeout((): void => {
    progress.value = 0
  }, props.limitTime * 1000)
}

const hide = async () => {
  await waiting()

  if (progress.value) {
    clearTimeout(timeout)
    progress.value--
  }
}

onBeforeUpdate(() => {
  isOpen.value = true
})

defineExpose({
  show,
  hide,
  delay
})
</script>

<template>
  <transition appear name="fade">
    <div class="spinner-box" v-show="isOpen">
      <transition appear name="scale" @after-leave="destroy">
        <div class="box" v-show="isShow">
          <div class="spinner">
            <img src="./spinner.png" />
          </div>
          <p>{{ message }}</p>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
