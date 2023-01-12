<script setup lang="ts">
import { ref, onMounted, defineProps, defineExpose } from 'vue'

// vue 3 typescript bug
export interface ModalOptions {
  type?: string
  message: string
  modalStyleClass?: string
  noScrollStyleClass?: string
  title?: string
  width?: number
  btnOkayText?: string
  btnCancelText?: string
  okay?: Function
  cancel?: Function
  destroy?: Function
}

const props = withDefaults(defineProps<ModalOptions>(), {
  width: 400,
  btnOkayText: '확인',
  btnCancelText: '취소'
})

let isShow = ref<boolean>(true)
let btnOkay = ref<HTMLAnchorElement | null>(null)

const hide = (): void => {
  let modalCheck: NodeList = document.body.querySelectorAll('.modal-bg')

  if (!modalCheck.length) {
    document.body.classList.remove('no-scroll')
  }

  isShow.value = false
}

const close = (): void => {
  if (props.destroy instanceof Function) {
    props.destroy.call(null)
  }
}

const clickOkay = (): void => {
  if (props.okay instanceof Function) {
    props.okay.call(null)
  }

  hide()
}

const clickCancel = () => {
  if (props.cancel instanceof Function) {
    props.cancel.call(null)
  }

  hide()
}

const keyupEvent = (evt: KeyboardEvent): void => {
  // Enter 키를 눌렀을 때 okay 실행
  if (evt.key === 'Enter') {
    clickOkay()
  }

  // ESC 키를 눌렀을때 창을 닫아 줌(cancel과 동일)
  if (evt.key === 'Escape') {
    clickCancel()
  }
}

onMounted(() => {
  document.body.classList.add('no-scroll')

  btnOkay.value?.focus()
  btnOkay.value?.blur()

  document.addEventListener('keyup', keyupEvent)
})

defineExpose({
  hide
})
</script>

<template>
  <transition name="modal-fade">
    <div class="alert-modal" tabindex="0" v-show="isShow">
      <transition appear name="modal-scale" @after-leave="close">
        <div class="modal-box"
          :style="{ width: `${width}px` }"
          v-show="isShow">
          <h3 class="title">{{ title }}</h3>
          <div class="contents" v-html="message"></div>
          <div class="actions">
            <a
              href="#"
              class="btn btn-cancel"
              @click.prevent="clickCancel"
              v-if="type == 'confirm'">
              {{ btnCancelText }}
            </a>
            <a
              href="#"
              ref="btnOkay"
              class="btn btn-okay"
              @click.prevent="clickOkay">
              {{ btnOkayText }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>