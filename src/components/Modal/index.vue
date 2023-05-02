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
  (event: 'dispose'): void
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
const close = (): void => {
  // 창이 제거되기 전이기 때문에 팝업의 수는 기본 1
  if (modalBg!.length === 1) {
    document.body.classList.remove('no-scroll')
  }

  modal.value!.removeEventListener('keydown', keyDownEvent)
  modal.value!.removeEventListener('keyup', keyUpEvent)

  isShow.value = false
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

/**
 * 모달창 닫기
 * 애니메이션 처리를 제대로 해주기 위해서 사용
 */
const dispose = (): void => {
  emit('dispose')
}

const setEvents = (): void => {
  modalBg = document.body.querySelectorAll('.modal-bg:not(.hide)')

  modal.value!.addEventListener('keydown', keyDownEvent)
  modal.value!.addEventListener('keyup', keyUpEvent)
  modal.value!.focus()
}

defineExpose({
  close
})
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
            :style="{ width: props.width && props.width }"
            :class="boxStyle"
            v-show="isShow">
            <div class="modal-header">
              <span>{{ props.title }}</span>
              <a href="#" class="close" @click.prevent="close">
                <span class="material-icons">close</span>
              </a>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-action" v-if="slots.action">
              <slot name="action"></slot>
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