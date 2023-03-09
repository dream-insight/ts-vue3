# Modal component plugin

## 항목

1. [사용방법](#1-사용방법)
2. [Options](#2-options)
3. [Types](#3-types)

# 1. 사용방법

## 1.1. 전역 선언
```javascript
// main.js
import Modal from '@/components/Modal'

// opational config
const options = {
  modalStyleClass: '.modal-bg',
  noScrollStyleClass: '.no-scroll'
}

app.use(Modal, options)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
import { inject } from 'vue'
import type { Modal } from '@/components/Modal/types'

// plugin
const Modal = inject('Modal') as Modal

function openModal(type = 'alert') {
  if (type == 'alert') {
    Modal.alert({
      message: 'test',
      okay: () => {
        console.log('okay!!!')
      }
    })
    // only messsage
    // Modal.alert('message...')
  } else {
    Modal.confirm({
      title: '역시 확인해주세요.',
      message: '이게 맞는 건가요?<br>맞다면 맞음 버튼 클릭',
      btnOkayText: '맞음',
      btnCancelText: '아니오',
      okay: () => {
        console.log('confirm!!!')
      }
    })
  }
}
</script>

<template>
  <p><button type="button" @click="openModal()">Alert 보기</button></p>
  <p><button type="button" @click="openModal('confirm')">Confirm 보기</button></p>
</template>
```

# 2. Options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| message | string | <code>''</code> | 표시 할 메시지를 |
| title? | string | <code>''</code> | 창의 제목을 설정합니다. |
| icon? | string | <code>''</code> | Font-Awesome 등의 아이콘을 표기 하기 위한 옵션 사용시에 별도의 설정이 필요합니다. |
| width? | string, Number | <code>400</code> | 모달 창의 넓이를 조절 합니다. |
| okay? | Function | <code>null</code> | 확인 버튼을 눌렀을때 실행할 callback 함수 |
| cancel? | Function | <code>null</code> | 취소 버튼을 눌렀을대 실행할 callback 함수 |
| btnOkayText? | string | <code>확인</code> | 확인 버튼에 표시할 문자열 |
| btnCancelText? | string | <code>취소</code> | 취소 버튼에 표시할 문자열 |
| modalStyleClass? | string | <code>.modal-bg</code> | 화면 전체를 가리는 레이아웃의 style class, <br> 꼭 .class-name 으로 입력해야 합니다.|
| noScrollStyleClass? | string | <code>.no-scroll</code> | modal이 화면을 덮었을때 body 테그에 삽입될 스크롤 삭제 style class |

:arrow_up: [항목](#항목)

---

# 3. Types

## 3.1. ModalStyleOptions
```typescript
export interface ModalStyleOptions {
  modalStyleClass: string
  noScrollStyleClass: string
}
```

## 3.2. ModalOptions
```typescript
export interface ModalOptions {
  type?: string
  message: string
  modalStyleClass?: string
  noScrollStyleClass?: string
  title?: string
  width?: number
  btnOkayText?: string
  btnCancelText?: string
  okay?: Function
  cancel?: Function
  destroy?: Function
}
```

## 3.3. Modal
```typescript
export interface Modal {
  alert(params: ModalOptions | string): void
  confirm(params: ModalOptions | string): void
}
```

:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)