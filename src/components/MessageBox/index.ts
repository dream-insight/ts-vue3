import { h, render, isVNode }  from 'vue'
import type { App, VNode } from 'vue'
import MessageBoxComponent from './component.vue'
import { messageBoxType } from './types'
import type { MessageBox, MessageBoxType, MessageBoxOptions } from './types'

export default {
  install(app: App) {
    const body = document.querySelector('body') as HTMLBodyElement
    const msgWrapper = document.createElement('div')
    msgWrapper.id = 'messageBox'

    body.appendChild(msgWrapper)

    let VNode: VNode | null = null

    const destroy = (): void => {
      render(null, msgWrapper)
      VNode = null
    }

    const setMessage = (opt: MessageBoxOptions | string, type: MessageBoxType): void => {
      const props: MessageBoxOptions = {
        message: '',
        title: (type === messageBoxType.alert) ? '알림' : '확인',
        type
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

        props.destroy = destroy

        props.message = opt.message
      } else {
        props.message = opt
      }

      props.destroy = destroy

      if (!isVNode(VNode)) {
        const wrapper = document.querySelector('#messageBox') as HTMLDivElement

        VNode = h(MessageBoxComponent, props)
        render(VNode, wrapper)
      }
    }

    const alert = (params: MessageBoxOptions | string): void => {
      setMessage(params, messageBoxType.alert)
    }

    const confirm = (params: MessageBoxOptions | string): void => {
      setMessage(params, messageBoxType.confirm)
    }

    const messageBox: MessageBox = {
      alert,
      confirm
    }

    app.config.globalProperties.$messageBox = messageBox
    app.provide('MessageBox', messageBox)
  }
}