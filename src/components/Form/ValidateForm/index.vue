<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const frm = ref<HTMLFormElement | null>(null)

let checkState: boolean = true
let firstEl: HTMLElement

const validate = (): boolean => {
  checkState = true

  if (frm.value) {
    traverse(frm.value.__vnode)

    // 검수에 통과하지 못한 가장 첫번째 폼에 포커스
    if (firstEl) {
      firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return checkState
}

const resetForm = (): void => {
  if (frm.value) {
    traverse(frm.value.__vnode, 'reset')
  }
}

const traverse = (el: any, flag: string = 'dom'): void => {
  if (Array.isArray(el.children)) {
    const len: number = el.children.length

    if (len > 0) {
      const vueNodes: any = el.children

      // vue node 전체(chilren)을 탐색 하여 chidren이 또 있는 경우 재귀한다.
      for (let i = 0; i < len; i++) {
        if (vueNodes[i].component) {
          traverse(vueNodes[i].component.subTree, flag)
        }

        if (vueNodes[i].children) {
          if (vueNodes[i].children?.length) {
            traverse(vueNodes[i], flag)
          }
        } else {
          componentCheck(vueNodes[i], flag)
        }
      }
    }
  } else if (!!el.component) {
    if (el.component.subTree !== undefined) {
      traverse(el.component.subTree, flag)
    }
  }
}

const componentCheck = (el: any, flag: string): void => {
  const vueDom = [
    'TextField', 'NumberFormat', 'SelectBox',
    'SwitchButton', 'CheckButton', 'DatePicker', 'ValidateWrap'
  ]

  // 컴포넌트인지 체크 후 필요한 처리를 한다.
  if (typeof el.type === 'object') {
    // npm install 된 컴포넌트는 __file property 없기 때문에 통과
    if (el.type.hasOwnProperty('name') ) {
      let tagName = el.type.name

      if (vueDom.includes(tagName)) {
        if (flag == 'reset') {
          el.component.exposed.resetForm()
        } else {
          if (!el.component.exposed.check() && checkState) {
            checkState = false

            // 가장 처음 검수에 통과 하지 못한 폼 저장 (라인 포커스)
            if (!firstEl) {
              firstEl = el.el
            }
          }
        }
      }
    }
  }
}

defineExpose({
  resetForm,
  validate
})
</script>

<template>
  <form ref="frm" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script lang="ts">
export default { name: 'ValidateForm' }
</script>