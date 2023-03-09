# # Vue3 Typescript 적용

## 개요
* Vue3로 작성된 Component를 Typescript로 변환하면서 격었던 상황들을 기록하여, 추후 비슷한 문제에 대한 솔루션으로 참조 하기 위함.
---

## Typescript 장점과 단점

### 1. 장점
* 변수 또는 인스턴스의 명확한 타입을 지정하여 최대한 오류를 방어한다.
* 유지보수에서 좀더 쉽게 접근 로직을 파악 할 수 있다.

### 2. 단점
* 코드량이 늘어난다. 그만큼 작업 시간이 늘어난다.
* 컴파일 시간이 늘어난다.
---

## 1. defineEmits, defineProps Bug
* defineEmits와 defineProps의 interface 적용시 파일을분리 하여 import 할 경우 적용이 안되는 현상이 있다.
* 이 현상은 <code>SFC</code>만 생기고 <code>js, ts</code>에서는 import 후 적용 가능하다.
* <code>SFC</code> 내에서 interface를 정의하여 적용 하여야 한다.
> 오류 코드
```typescript
// types.ts
interface ComponentProps {
  type: string
  okay: Function
  ...
}

// component.vue
import { defineProps } from 'vue'
import type { ComponentProps } from './types'

const props = defineProps<ComponentProps>()
                          ^^^^^^^^^^^^^^^ 오류 발생
```
> 정상 코드
```typescript
// component.vue
import { defineProps } from 'vue'

interface ComponentProps {
  type: string
  okay: Function
  ...
}

const props = defineProps<ComponentProps>()
```

---

## 2. Parameter Event 객체
* 함수에 Parameter로 받은 Event 객체는 바로 사용 할 수 없다.
> 오류 코드
```typescript
const click = (evt: Event) => {
  evt.target.focus()
  ^^^^^^^^^^ 오류 발생
}
```
* EventTarget은 null 일수 있기 때문에 필히 변수에 할당하여 사용해야 한다.
> 정상 코드
```typescript
const click = (evt: Event) => {
  const target: EventTarget | null = evt.target
  // or
  const target = evt.target as EventTarget
}
```
* 위와 같이 사용하면 오류는 없으나, 실제 사용되는 evt.target에 사용 의도와 달리 element 접근은 불가 하기 때문에 아래와 같이 다운 캐스팅 해준다.
```typescript
const click = (evt: Event) => {
  const target = evt.target as HTMLElement
  target.focus()
}
```

---

## 3. Plugin 컴포넌트
### 3.1. 작성 방법
* <code>Plugin</code> 작성시 아래와 같이 작성된 컴포넌트를 <code>h()</code> 함수를 사용하여 랜더링 할 경우 문제가 발생한다.
> 오류 코드
```vue
<script setup lang="ts">
// Message.vue
import { ref } from 'vue'

let message = ref<string>('hello world')
</script>

<template>
  <p>{{ message }}</p>
</template>
```

```typescript
import { h, render } from 'vue'
import Message from './Message.vue'
import type { MessageOptions } from './types'

export default {
  install(app: App, options?: MessageOptions ) {
    // ... todo
    const body: HTMLElement | null = document.querySelector('body')
    const VNode: VNode | null = null

    if (body !== null) {
      VNode = h(Message, props)
                ^^^^^^^ --> 오류 발생
      render(VNode, body)
    }
  }
}
```
* 코드에는 전혀 문제가 없지만, typescript 설정의 문제로 인하여 문제가 발생한다.
* 해당 오류는 <code>tsconfig.js</code>에 옵션을 추가 해주어 해결이 가능하다.
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    ...
    "allowJs": true, <-- 옵션 추가로 해결
    ...
}
```
### 3.2 사용 방법
* <code>&lt;script setup&gt;</code> 내에서 globalProperties에 접근 하여 사용하기는 꾀나 성가시다
```vue
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import type { Toast } from '@/components/Toast/types'

const app = getCurrentInstance()
const Toast: Toast = app?.appContext.config.gloablProperties.$toast
</script>
```
* 간단히 <code>inject</code> 핼퍼를 사용하여 정의합니다.
```vue
<script setup lang="ts">
import { inject } from 'vue'
import type { Toast, MessageOptions } from '@/components/Toast/types'

const Toast: Toast | undefined = inject('Toast')
// or
const Toast = inject<Toast>('Toast')

if (Toast) {
  Toast({
    color: 'info',
    message: '이렇게 쓰는게 편하다'
  })
}
</script>
```
* 하지만 위와 같은 경우 Toast 플러그인 호출 전에 Toast 인스턴스에 대한 존재 여부를 확인 하거나 옵셔널 체이닝(?.)으로 접근해야 한다.
* 이러한 귀찮은 코드를 피하기 위해 간단히 as 키워드를 이용하여 다운 캐스팅하여 코드를 줄일 수 있다.
```vue
<script setup lang="ts">
import { inject } from 'vue'
import type { Toast } from '@/components/Toast/types'

const Toast = inject('Toast') as Toast

if (Toast) {
  Toast({
    color: 'info',
    message: '이렇게 쓰는게 편하다'
  })
}
</script>
```
> 다운 캐스팅은 안전한 방식의 Casting이 아니다. 따라서 불가피한 상황이 아니라면 일반적인 캐스팅이나 타입 선언을 사용하여 코드 무결성을 높이는게 중요하다.

---
