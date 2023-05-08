# MessageBox component plugin

## 항목

1. [사용방법](#1-사용방법)
2. [Options](#2-options)
3. [Types](#3-types)

# 1. 사용방법

## 1.1. 전역 선언
```javascript
// main.js
import MessageBox from '@/components/MessageBox'
import { MessageBoxStyleOptions } from '@/components/MessageBox/types'

// opational config
const options: MessageBoxStyleOptions = {
  modalStyleClass: '.modal-bg',
  noScrollStyleClass: '.no-scroll'
}

app.use(MessageBox, options)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
import { inject } from 'vue'
import type { MessageBox } from '@/components/MessageBox/types'

// plugin
const MessageBox = inject('MessageBox') as MessageBox

const openMessage = (type = 'alert'): void => {
  if (type == 'alert') {
    MessageBox.alert({
      message: 'test',
      okay: () => {
        console.log('okay!!!')
      }
    })
    // only messsage
    // MessageBox.alert('message...')
  } else {
    MessageBox.confirm({
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
  <p><button type="button" @click="openMessage()">Alert 보기</button></p>
  <p><button type="button" @click="openMessage('confirm')">Confirm 보기</button></p>
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

:arrow_up: [항목](#항목)

---

# 3. Types

## 3.1. MessageBoxStyleOptions
```typescript
export interface MessageBoxStyleOptions {
  modalStyleClass: string
  noScrollStyleClass: string
}
```

## 3.2. ModalOptions
```typescript
export interface MessageBoxOptions extends MessageBoxStyleOptions {
  type?: MessageBoxType
  message: string
  title?: string
  width?: number
  btnOkayText?: string
  btnCancelText?: string
  okay?: Function
  cancel?: Function
  destroy?: Function
}
```

## 3.3. MessageBox
```typescript
export interface MessageBox {
  alert(params: MessageBoxOptions | string): void
  confirm(params: MessageBoxOptions | string): void
}
```

## 3.4. MessageBoxType with Enum
```typescript
export const messageBoxType = {
  alert: 'alert',
  confirm: 'confirm'
} as const

export type MessageBoxType = typeof messageBoxType[keyof typeof messageBoxType]
```

:arrow_up: [항목](#항목)

---

### UPDATE HISTORY

* 컴포넌트 플러그인 이름 변경 Modal -> MessageBox : 2023.04.25 김종윤 수석매니저
* MessageBoxType type 추가 : 2023.05.03 김종윤 수석매니저
* body에 바로 이식하는 방식에서 wrapper를 생성하여 wrapper에 이식하는 방식으로 변경: 2023.05.04 김종윤 수석매니저


---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)