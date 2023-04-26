# Toast message component plugin

# 항목

1. [사용방법](#1-사용방법)
2. [Options](#2-options)
3. [API methods](#3-api-method)
4. [Types](#4-types)
5. [그 외](#5-그-외)

---

# 1. 사용방법

## 1.1. 전역 선언
```javascript
// main.js
import Toast from '@/components/Toast'

// opational config
const options = {
  maxShowMessage: 3,
  delay: 5
}

app.use(Toast, options)
```
## 1.2. 예제 코드
```vue
<script setup lang="ts">
import { inject } from 'vue'
import type { Toast, ToastColorCase } from '@/components/Toast/types'

const Toast = inject('Toast') as Toast

function showToast(color: ToastColorCase) {
  if (color == 'success') {
    Toast('success toast message')
  } else {
    Toast({ color, message: `${color} toast message` })
  }
}
</script>

<template>
  <div>
    <p><button type="button" @click="showToast('success')">success toast</button></p>
    <p><button type="button" @click="showToast('info')">info toast</button></p>
    <p><button type="button" @click="showToast('warning')">warning toast</button></p>
    <p><button type="button" @click="showToast('danger')">error toast</button></p>
  </div>
</template>
```

:arrow_up: [항목](#항목)

---

# 2. options
| Name | Type | Default | Description |
|-------|---- |---------|-------------|
| maxShowMessage? | number | <code>3</code> | 화면에 표시될 최대 메시지 수량 |
| dalay? | number | <code>5</code> | 메시지가 화면에 표시되는 시간 (초 단위) |

:arrow_up: [항목](#항목)

---

# 3. API method

## 3.1. <code>Toast([MessageOptions](#4-MessageOptions))</code>
* 토스트 메시지를 표시 합니다.
```javascript
Toast('토스트 메시지')
// or
Toast({
  color: 'success'
  message: '토스트 메시지',
})
```

:arrow_up: [항목](#항목)

---

# 4. Types

## 1. ToastColorCase
```typescript
export const toastColorCase = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  danger: 'danger'
} as const

export type ToastColorCase = typeof toastColorCase[keyof typeof toastColorCase]
```

## 2. ToastIconCase
```typescript
export const toastIconCase = {
  success: 'check_circle_outline',
  warning: 'warning_amber',
  info: 'info_outline',
  danger: 'dangerous'
} as const

export type ToastIconCase = typeof toastIconCase[keyof typeof toastIconCase]
```

## 3. ToastOptions
```typescript
export interface ToastOptions {
  maxShowMessage?: number
  delay?: number,
  destroy: Function
}
```

## 4. MessageOptions
```typescript
export interface MessageOptions {
  message: string
  icon?: IconCase
  color?: ColorCase
}
```

## 5. Toast
```typescript
export interface Toast {
  (params: string | MessageOptions): void
}
```

:arrow_up: [항목](#항목)

---

### UPDATE HISTORY

* styleheet 및 icon 변경(google material icon) : 2023.04.24 김종윤 수석매니저

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)