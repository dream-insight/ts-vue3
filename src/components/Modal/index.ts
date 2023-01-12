import { h, render }  from 'vue'
import type { App, VNode } from 'vue'
import modalComponent from './component.vue'
import type { Modal, ModalStyleOptions, ModalOptions } from './types'

export default {
  install(app: App, options?: ModalStyleOptions) {
    const body: HTMLElement | null = document.querySelector('body')

    let VNode: VNode | null = null

    let modalStyleClass: string = '.modal-bg'
    let noScrollStyleClass: string = '.no-scroll'

    if (options) {
      if (options.hasOwnProperty('modalStyleClass')) {
        modalStyleClass = options.modalStyleClass
      }

      if (options.hasOwnProperty('noScrollStyleClass')) {
        noScrollStyleClass = options.noScrollStyleClass
      }
    }

    const destroy = (): void => {
      if (body !== null) {
        render(null, body)
        VNode = null
      }
    }

    const setMessage = (opt: ModalOptions | string, type: string): void => {
      const props = <ModalOptions>{
        type,
        title: (type === 'alert') ? '알림' : '확인',
      }

      if (opt instanceof Object) {
        if (opt.hasOwnProperty('title')) {
          props.title = opt.title
        }

        if (opt.hasOwnProperty('width')) {
          if (!isNaN(Number(opt.width))) {
            props.width = Number(opt.width)
          }
        }

        if (opt.hasOwnProperty('btnOkayText')) {
          props.btnOkayText = opt.btnOkayText
        }

        if (opt.hasOwnProperty('btnCancelText')) {
          props.btnCancelText = opt.btnCancelText
        }

        if (opt.okay instanceof Function) {
          props.okay = opt.okay
        }

        if (opt.cancel instanceof Function) {
          props.cancel = opt.cancel
        }

        if (opt.hasOwnProperty('modalStyleClass')) {
          props.modalStyleClass = opt.modalStyleClass
        } else {
          props.modalStyleClass = modalStyleClass
        }

        if (opt.hasOwnProperty('noScrollStyleClass')) {
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

      if (VNode === null) {
        VNode = h(modalComponent, props)

        if (body !== null) {
          render(VNode, body)
        }
      }
    }

    const alert = (params: ModalOptions): void => {
      setMessage(params, 'alert')
    }

    const confirm = (params: ModalOptions): void => {
      setMessage(params, 'confirm')
    }

    const modal: Modal = {
      alert,
      confirm
    }

    app.config.globalProperties.$modal = modal
    app.provide('Modal', modal)
  }
}