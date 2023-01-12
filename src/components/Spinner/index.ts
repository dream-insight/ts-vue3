import { h, render } from 'vue'
import type { App, VNode } from 'vue'
import SpinnerComponent from './component.vue'

export interface Spinner {
  timeout(limit: number): this
  show(msg?: string): void
  delay(sec: number): this
  hide(): void
}

export default {
  install: (app: App, limitTime: number = 10): void => {
    const body = document.querySelector('body') as HTMLBodyElement
    let VNode: VNode | null = null

    class spinner {
      constructor() {
        console.log('here')
        this.createNode()
      }

      private createNode(): void {
        if (!VNode) {
          VNode = h(SpinnerComponent, {
            limitTime,
            destroy: this.destroy
          })

          render(VNode, body)
        }
      }

      private destroy(): void {
        if (VNode) {
          render(null, body)
          VNode = null
        }
      }

      /**
       * spinner 최대 표시 시간을 설정
       *
       * @param { Number } limit 최대 표시 시간 기본 10초
       * @returns { this }
       */
      public timeout(limit: number): this {
        this.createNode()

        if (limit && VNode?.component) {
          VNode.component.props.limitTime = limit
        }

        return this
      }

      /**
       * Spinner를 표시 하기 위한 메서드
       *
       * @param { String } msg 박스 하단 부분에 표시될 text
       */
      public show(msg: string = ''): void {
        this.createNode()

        if (VNode?.component?.exposed) {
          VNode.component.exposed.show(msg)
        }
      }

      /**
       * 채이닝 이후 메서드 실행을 지연시키기 위한 메서드
       *
       * @param { Number } sec 지연 시간 (초)
       * @returns { this } 메서드 채이닝을 위한 this 반환
       */
      public delay(sec: number): this {
        this.createNode()

        if (VNode?.component?.exposed) {
          VNode.component.exposed.delay.value = sec
        }

        return this
      }

      /**
       * 스피너를 닫아 줍니다.
       */
      public hide() {
        if (VNode?.component?.exposed) {
          VNode.component.exposed.hide()
        }
      }
    }

    // app.config.globalProperties.$spinner = objectSpinner
    app.provide('Spinner', new spinner())
  }
}