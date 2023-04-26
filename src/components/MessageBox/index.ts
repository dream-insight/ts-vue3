import { h, render, isVNode }  from 'vue'
import type { App, VNode } from 'vue'
import MessageBoxComponent from './component.vue'
import type { MessageBox, MessageBoxStyleOptions, MessageBoxOptions } from './types'

export default {
  install(app: App, options?: MessageBoxStyleOptions) {
    const body = document.querySelector('body') as HTMLBodyElement

    let VNode: VNode | null = null

    let modalStyleClass: string = '.modal-bg'
    let noScrollStyleClass: string = '.no-scroll'

    if (options) {
      if ('modalStyleClass' in options) {
        modalStyleClass = options.modalStyleClass!
      }

      if ('noScrollStyleClass' in options) {
        noScrollStyleClass = options.noScrollStyleClass!
      }
    }

    const destroy = (): void => {
      render(null, body)
      VNode = null
    }

    const setMessage = (opt: MessageBoxOptions | string, type: string): void => {
      const props: MessageBoxOptions = {
        message: '',
        type,
        title: (type === 'alert') ? '알림' : '확인',
      }

      if (opt instanceof Object) {
        if ('title' in opt) {
          props.title = opt.title
        }

        if ('width' in opt) {
          if (!isNaN(Number(opt.width))) {
            props.width = Number(opt.width)
          }
        }

        if ('btnOkayText' in opt) {
          props.btnOkayText = opt.btnOkayText
        }

        if ('btnCancelText' in opt) {
          props.btnCancelText = opt.btnCancelText
        }

        if (opt.okay instanceof Function) {
          props.okay = opt.okay
        }

        if (opt.cancel instanceof Function) {
          props.cancel = opt.cancel
        }

        if ('modalStyleClass' in opt) {
          props.modalStyleClass = opt.modalStyleClass
        } else {
          props.modalStyleClass = modalStyleClass
        }

        if ('noScrollStyleClass' in opt) {
          props.noScrollStyleClass = opt.noScrollStyleClass
        } else {
          props.noScrollStyleClass = noScrollStyleClass
        }

        props.destroy = destroy

        props.message = opt.message
      } else {
        props.message = opt
      }

      props.destroy = destroy

      if (!isVNode(VNode)) {
        VNode = h(MessageBoxComponent, props)
        render(VNode, body)
      }
    }

    const alert = (params: MessageBoxOptions | string): void => {
      setMessage(params, 'alert')
    }

    const confirm = (params: MessageBoxOptions | string): void => {
      setMessage(params, 'confirm')
    }

    const messageBox: MessageBox = {
      alert,
      confirm
    }

    app.config.globalProperties.$messageBox = messageBox
    app.provide('MessageBox', messageBox)
  }
}