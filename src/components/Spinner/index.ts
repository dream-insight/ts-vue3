import { h, render, isVNode } from 'vue'
import type { App, VNode } from 'vue'
import SpinnerComponent from './component.vue'
import type { Spinner } from './types'

export class spinner implements Spinner {
  body = document.querySelector('body') as HTMLBodyElement
  VNode: VNode | null = null
  limitTime: number = 0

  constructor(limitTime: number = 10) {
    this.limitTime = limitTime
  }

  private createNode(): void {
    if (!isVNode(this.VNode)) {
      this.VNode = h(SpinnerComponent, {
        limitTime: this.limitTime,
        destroy: this.destroy
      })

      render(this.VNode, this.body)
    }
  }

  /**
   * spinner 최대 표시 시간을 설정
   *
   * @param limit 최대 표시 시간 기본 10초
   * @returns
   */
  public timeout(limit: number) {
    this.createNode()

    if (limit && this.VNode?.component) {
      this.VNode.component.props.limitTime = limit
    }

    return this
  }

  /**
   * 채이닝 이후 메서드 실행을 지연시키기 위한 메서드
   *
   * @param sec 지연 시간 (초)
   * @returns 메서드 채이닝을 위한 this 반환
   */
  public delay(sec: number) {
    this.createNode()

    if (this.VNode?.component?.exposed) {
      this.VNode.component.exposed.delay.value = sec
    }

    return this
  }

  /**
   * Spinner를 표시 하기 위한 메서드
   *
   * @param msg 박스 하단 부분에 표시될 text
   */
  public show(msg: string = ''): void {
    this.createNode()

    if (this.VNode?.component?.exposed) {
      this.VNode.component.exposed.show(msg)
    }
  }

  /**
   * 스피너를 닫아 줍니다.
   */
  public hide(): void {
    if (this.VNode?.component?.exposed) {
      this.VNode.component.exposed.hide()
    }
  }

  private destroy(): void {
    if (this.VNode) {
      render(null, this.body)
      this.VNode = null
    }
  }
}

export default {
  install: (app: App, limitTime: number = 10): void => {
    // app.config.globalProperties.$spinner = new spinner(limitTime)
    app.provide('Spinner', new spinner(limitTime))
  }
}