<script setup lang="ts">
import { ref, watchEffect, computed, defineProps, defineEmits, defineExpose, useSlots } from 'vue'
import { modalPosition, modalTransition } from './types'
import type { ModalPosition, ModalTransition } from './types'

const slots = useSlots()

const props = withDefaults(defineProps<{
  modelValue: boolean
  title: string
  escClose?: boolean
  width?: string
  position?: ModalPosition
  screenCover?: boolean
}>(), {
  modelValue: false,
  escClose: false,
  position: modalPosition.popup,
  screenCover: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

let isShow = ref<boolean>(false)
let keyEventStyle = ref<string>('')

// 창이 닫히기 전에 다른 팝업 창이 있는지 검수
let modalBg: NodeListOf<Element>

const modal = ref<HTMLDivElement>()

watchEffect(() => {
  isShow.value = props.modelValue

  if (props.modelValue) {
    document.body.classList.add('no-scroll')
  }
})

const transitionName = computed<ModalTransition>(() => modalTransition[props.position])
const boxStyle = computed<string[]>(() => {
  let cover: string = ''

  if (props.position !== 'popup' && props.screenCover) {
    cover = 'screen-cover'
  }

  return ['modal-box', keyEventStyle.value, props.position, cover]
})

/**
 * 모달 창 닫기
 */
const close = (callback: Function | null = null): void => {
  if (callback instanceof Function) {
    callback()
  }

  // 창이 제거되기 전이기 때문에 팝업의 수는 기본 1
  if (modalBg!.length === 1) {
    document.body.classList.remove('no-scroll')
  }

  modal.value!.removeEventListener('keydown', keyDownEvent)
  modal.value!.removeEventListener('keyup', keyUpEvent)

  isShow.value = false
}

const dispose = (): void => {
  emit('update:modelValue', false)
}

const keyDownEvent = (event: KeyboardEvent): void => {
  if (event.key.toLowerCase() === 'escape') {
    if (props.escClose) {
      close()
    } else {
      keyEventStyle.value = 'big'
    }
  }
}

const keyUpEvent = (event: KeyboardEvent): void => {
  if (event.key.toLowerCase() === 'escape') {
    if (!props.escClose) {
      keyEventStyle.value = ''
    }
  }
}

const setEvents = (): void => {
  modalBg = document.body.querySelectorAll('.modal-bg:not(.hide)')

  modal.value!.addEventListener('keydown', keyDownEvent)
  modal.value!.addEventListener('keyup', keyUpEvent)
  modal.value!.focus()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      appear
      name="modal-fade"
      @after-leave="dispose"
      @after-enter="setEvents">
      <div
        ref="modal"
        :class="['modal-bg', !isShow && 'hide']"
        tabindex="0"
        v-show="isShow">
        <Transition appear :name="transitionName">
          <div
            :style="{ width: props.width }"
            :class="boxStyle"
            v-show="isShow">
            <div class="modal-header">
              <span>{{ props.title }}</span>

              <a href="#" class="close" @click.prevent="close()">
                <span class="mdi mdi-window-close"></span>
              </a>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-action" v-if="slots.action">
              <slot name="action" :close="close"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'Modal' }
</script>