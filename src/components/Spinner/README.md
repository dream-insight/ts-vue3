# Spinner component plugin

# 항목

1. [사용방법](#1-사용방법)
2. [Option](#2-options_
3. [API methods](#3-api-methods)
4. [Types](#4-types)

---

# 1. 사용방법
* 해당 스피너는 Bootstrap v5.2 기반으로 작성 되어있습니다. [Bootstrap 가기](https://getbootstrap.kr/docs/5.2/components/spinners/)

## 1.1. 전역 선언
```typescript
import Spinner from '@/components/Spinner'
import type { SpinnerProps } '@/components/Spinner'

// optional config
const options: SpinnerProps = {
  limitTimeout: 10,
  delay: 0,
}

app.use(Spinner, options)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Spinner } from '@/components/Spinner/types'

const Spinner = inject('Spinner') as Spinner

let timer = ref<number>(0)
let message = ref<string>('버튼을 클릭해서 스피너를 확인 하세요.')

const setTimer = (time: number): void => {
  timer.value = time

  const interval = setInterval(() => {
    time--
    timer.value = time

    if (time < 0) {
      clearInterval(interval)
      message.value = '버튼을 클릭해서 스피너를 확인 하세요.'
    }
  }, 1000)
}

const show = async (flag: number = 0): void => {
  message.value = ''

  if (flag === 0) {
    Spinner.show()
  } else {
    Spinner.timeout(5).delay(3).show()
  }
}
</script>

<template>
  <p v-if="message">{{ message }}</p>
  <p v-else>{{ timer }}초 이후 스피너가 닫힙니다.</p>
  <button type="button" @click="show()">10초 보기</button>
  <button type="button" @click="show(1)">3초 후에 5초 보기</button>
</template>

<style lang="scss" scoped>
button + button { margin-left: 5px; }
</style>
```

:arrow_up: [항목](#항목)

---

# 2. options
| Name | Type | Default | Description |
|-------|---- |---------|-------------|
| limitTime? | number | <code>10</code> | 스피너가 보여진 이후 <code>hide()</code> 메서드 호출이 없을 경우 표시되는 최대 시간(초 단위) |
| delay? | number | <code>0</code> | <code>show()</code> 실행시 지연 시간 설정 (초 단위) |

:arrow_up: [항목](#항목)

---

# 3. API methods
## 3.1. show(msg?: string)
* 스피너 레이아웃을 표시합니다.
```javascript
Spinner.show()
// or
Spinner.show('please wait...')
```

## 3.2. hide()
* 스피너 레이아웃을 즉시 숨깁니다.
```javascript
Spinner.hide()
```

## 3.3. delay(time: number)
* 메서드 실행을 딜레이 시켜 줍니다. (Promise)
```javascript
await Spinner.delay(2).show() // 2초 후 스피너 표시
await Spinner.delay(10).hide() // 스피너가 표시 중이라면 10초 후 숨김
```

## 3.4. timeout(time: number)
* limitTimeout 설정을 변경 합니다.
```javascript
await Spinner.timeout(5).show() // 스피너가 표시 중이라면 5초 후 숨김
```

:arrow_up: [항목](#항목)

---

# 4. Types

## 4.1. Spinner
```typescript
export interface Spinner {
  timeout(limit: number): this
  show(msg?: string): void
  delay(sec: number): this
  hide(): void
}
```

:arrow_up: [항목](#항목)

---

### UPDATE HISTORY

* spinner 애니메이션 변경 : 2023.04.25 김종윤 수석매니저

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)