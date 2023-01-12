import { h, render } from 'vue'
import type { App, VNode } from 'vue'
import ToastComponent from './component.vue'
import type { Toast, ToastOptions, MessageOptions } from './types'

export default {
  install: (app: App, options?: ToastOptions) => {
    const body = document.querySelector('body') as HTMLBodyElement
    let VNode: VNode | null = null
    const props = <ToastOptions>{
      maxShowMessage: 4,
      delay: 3000
    }

    if (options) {
      if (options.hasOwnProperty('maxShowMessage')) {
        props.maxShowMessage = options.maxShowMessage
      }

      if (options.hasOwnProperty('delay')) {
        props.delay = options.delay
      }
    }

    const iconCase = <{
      [index: string]: string
    }>{
      success: 'check-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle',
      error: 'ban'
    }

    const setMessage = (opt: MessageOptions | string): void => {
      if (VNode === null) {
        VNode = h(ToastComponent, props)
        render(VNode, body)
      }

      if (VNode.component?.exposed) {
        if (opt instanceof Object) {
          if (opt.hasOwnProperty('message')) {
            VNode.component.exposed.message.value = opt.message
          } else {
            console.error('toast message is not set')
            return
          }

          if (opt.hasOwnProperty('color') && opt.color !== undefined) {
            VNode.component.exposed.icon.value = iconCase[opt.color]
            VNode.component.exposed.color.value = opt.color
          }
        } else if (typeof opt === 'string') {
          VNode.component.exposed.message.value = opt
          VNode.component.exposed.color.value = 'success'
          VNode.component.exposed.icon.value = iconCase.success
        } else {
          console.error('toast message is not set')
          return
        }

        VNode.component.exposed.show()
      }
    }

    const objectToast: Toast = (params: MessageOptions | string): void => {
      setMessage(params)
    }

    app.config.globalProperties.$toast = objectToast
    app.provide('Toast', objectToast)
  }
}