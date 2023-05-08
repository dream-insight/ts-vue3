import { h, render, isVNode } from 'vue'
import type { App, VNode } from 'vue'
import ToastComponent from './component.vue'
import type { Toast, ToastOptions, MessageOptions } from './types'
import { toastIconCase, toastColorCase } from './types'

export default {
  install: (app: App, options?: ToastOptions) => {
    let VNode: VNode | null = null
    const body = document.querySelector('body') as HTMLBodyElement
    const wrapper: HTMLDivElement = document.createElement('div')
    wrapper.id = 'toast'

    body.appendChild(wrapper)

    const props: ToastOptions = {
      maxShowMessage: 4,
      delay: 3000,
      destroy: (): void => {
        render(null, body)
        VNode = null
      }
    }

    const init = () => {
      if (!isVNode(VNode)) {
        const toastBase = document.querySelector('#toast') as HTMLDivElement

        VNode = h(ToastComponent, props)
        render(VNode, toastBase)
      }
    }

    if (options) {
      if ('maxShowMessage' in options) {
        props.maxShowMessage = options.maxShowMessage
      }

      if ('delay' in options) {
        props.delay = options.delay
      }
    }

    const setMessage = (opt: MessageOptions | string): void => {
      init()

      if (VNode) {
        if (VNode.component?.exposed) {
          const { exposed } = VNode.component

          if (opt instanceof Object) {
            if ('message' in opt) {
              exposed.message.value = opt.message
            } else {
              console.error('toast message is not set')
              return
            }

            if (opt.color) {
              exposed.icon.value = toastIconCase[opt.color]
              exposed.color.value = opt.color
            }
          } else if (typeof opt === 'string') {
            exposed.message.value = opt
            exposed.color.value = toastColorCase.success
            exposed.icon.value = toastIconCase.success
          } else {
            console.error('toast message is not set')
            return
          }

          exposed.show()
        }
      }
    }

    const objectToast: Toast = (params: MessageOptions | string): void => {
      setMessage(params)
    }

    // app.config.globalProperties.$toast = objectToast
    app.provide('Toast', objectToast)
  }
}