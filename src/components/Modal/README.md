# Modal component

## 항목

1. [사용방법](#1-사용방법)
2. [Options](#2-options)
3. [Types](#3-types)

# 1. 사용방법

## 1.1. 전역 선언
```javascript
// main.js
import Modal from '@/components/Modal/index.vue'

app.compnent('Modal', Modal)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/Modal/index.vue'
import { ModalMethods } from '@/components/Modal/types'

let isShow = ref<boolean>(false)
const modal = ref<ModalMethods>()
</script>

<template>
  <Modal
    ref="modalPopup"
    title="기본 형태 모달 팝업"
    @dispose="isShow = false"
    v-model="isShow">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.
    </template>
    <template v-slot:action>
      <Button color="light" @click="modal?.close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>
</template>
```
> 주의 사항: <code>v-model</code>을 변이할 경우 transition이 완전히 이루어지지 않고 창이 닫히게 됩니다.<br>
해당 현상을 피하기 위해서는 반듯이 <code>ModalMethods.close</code> 함수와 <code>dispose</code>를 이용해주세요.

# 2. Options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | boolean | <code>false</code> | 모달을 열고 닫습니다. |
| title | string | <code>none</code> | 모달 제목을 |
| position? | [ModalPosition](#-32-ModalPosition-with-Enum) | <code>none</code> | 모달 제목을 |
| escClose? | boolean | <code>false</code> | ESC 키로 모달창을 닫을지 여부 |
| width? | string | <code>none</code> | 모달의 고정 넓이를 지정합니다, css 크기 단위 필수 |
| screenCover? | boolean | <code>false</code> | 모달이 전체 화면을 덮을지 여부, ModalPosition.popup일때 사용 불가 |


:arrow_up: [항목](#항목)

---

# 3. Types

## 3.1 ModalMethods
```js
export interface ModalMethods {
  close: Function
}
```

## 3.2 ModalPosition with Enum
```js
export const modalPosition = {
  popup: 'popup',
  right: 'right',
  left: 'left',
  bottom: 'bottom',
} as const

export type ModalPosition = typeof modalPosition[keyof typeof modalPosition]
```

## 3.3 ModalTransition with Enum
```js
export const modalTransition = {
  popup: 'modal-scale',
  right: 'modal-slide-in-right',
  left: 'modal-slide-in-left',
  bottom: 'modal-slide-in-bottom',
} as const

export type ModalTransition = typeof modalTransition[keyof typeof modalTransition]
```

:arrow_up: [항목](#항목)

---

### UPDATE HISTORY

* 최초 작성 : 2023.04.25 김종윤 수석매니저


---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)