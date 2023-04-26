<script setup lang="ts">
import { ref, onMounted } from 'vue'

// vue 3 typescript bug
export interface MessageBoxOptions {
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

const props = withDefaults(defineProps<MessageBoxOptions>(), {
  width: 400,
  btnOkayText: '확인',
  btnCancelText: '취소'
})

let isShow = ref<boolean>(true)
let btnOkay = ref<HTMLAnchorElement>()

const hide = (): void => {
  let box: NodeList = document.body.querySelectorAll('.msg-box-bg')

  if (box.length) {
    document.body.classList.remove('hide-scroll')
  }

  isShow.value = false
}

const close = (): void => {
  if (props.destroy instanceof Function) {
    props.destroy()
  }
}

const clickOkay = (): boolean => {
  if (props.okay instanceof Function) {
    props.okay()
  }

  hide()

  return true
}

const clickCancel = (): boolean => {
  if (props.cancel instanceof Function) {
    props.cancel()
  }

  hide()

  return false
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
  document.body.classList.add('hide-scroll')

  btnOkay.value?.focus()
  btnOkay.value?.blur()

  document.addEventListener('keyup', keyupEvent)
})

defineExpose({
  hide
})
</script>

<template>
  <Teleport to="body">
    <transition name="msg-box-fade">
      <div class="msg-box-bg" tabindex="0" v-show="isShow">
        <transition appear name="msg-box-scale" @after-leave="close">
          <div class="msg-box"
            :style="{ width: `${width}px` }"
            v-show="isShow">
            <div class="title">{{ title }}</div>
            <div class="contents" v-html="message"></div>
            <div class="actions">
              <a
                href="#"
                ref="btnOkay"
                class="btn-okay"
                @click.prevent="clickOkay">
                {{ btnOkayText }}
              </a>
              <a
                href="#"
                class="btn-cancel"
                @click.prevent="clickCancel"
                v-if="type == 'confirm'">
                {{ btnCancelText }}
              </a>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss">
@import './style.scss';
</style>