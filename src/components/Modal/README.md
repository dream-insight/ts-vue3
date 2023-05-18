# Modal component

## 항목

1. [사용방법](#1-사용방법)
2. [Options](#2-options)
3. [Types](#3-types)
3. [Slots](#4-slots)

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

let isShow = ref<boolean>(false)
</script>

<template>
  <Modal
    ref="modalPopup"
    title="기본 형태 모달 팝업"
    v-model="isShow">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.
    </template>
    <template #action="{ close }">
      <Button color="light" @click="close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>
</template>
```
> action slot의 close 함수를 실행하게 되면 modelValue를 업데이트 해준다.<br>
하지만 document 자체에는 modal이 남아 있기 때문에 완전히 컴포넌트를 파기 하기 위해서는 v-if로 제어 해야 한다.

# 2. Options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | boolean | <code>false</code> | 모달을 열고 닫습니다. |
| title | string | <code>none</code> | 모달 제목을 |
| position? | [ModalPosition](#41-modalposition-with-enum) | <code>none</code> | 모달 제목을 |
| escClose? | boolean | <code>false</code> | ESC 키로 모달창을 닫을지 여부 |
| width? | string | <code>none</code> | 모달의 고정 넓이를 지정합니다, css 크기 단위 필수 |
| screenCover? | boolean | <code>false</code> | 모달이 전체 화면을 덮을지 여부, ModalPosition.popup일때 사용 불가 |
| accessBack? | boolean | <code>false</code> | 모달에 대한 url을 부여 했을때 뒤로가기 등을 제어 하기 위한 옵션 |


:arrow_up: [항목](#항목)

---

# 3. Slots

## 3.1. body

* 주요 컨텐츠를 표시

## 3.2. action

* 버튼 등을 나열하여 각종 기능을 수행 할 수 있도록 나눠 놓은 섹션

## 3.3. title

* 제목 표시 부분 오른 쪽에 표시됨 (flex 정렬)

### 3.2.1. Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| close | Function(callback): void | null | 모달을 닫기 위해 전달되는 함수, 창을 닫기전 수행해야 할 스크립트를 callback으로 전달하여 실행 가능 |


:arrow_up: [항목](#항목)

---

# 4. Types

## 4.1 ModalPosition with Enum
```js
export const modalPosition = {
  popup: 'popup',
  right: 'right',
  left: 'left',
  bottom: 'bottom',
} as const

export type ModalPosition = typeof modalPosition[keyof typeof modalPosition]
```

## 4.2 ModalTransition with Enum
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
* action slot close method 추가: 2023.05.09 김종윤 수석매니저


---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)