# Spinner component plugin

# 1. 사용방법
* 해당 스피너는 Bootstrap v5.2 기반으로 작성 되어있습니다. [Bootstrap](https://getbootstrap.kr/docs/5.2/components/spinners/)
```javascript
// main.js
import Spinner from '@/components/Spinner'
import type { SpinnerProps } '@/components/Spinner'

// optional config
const options: SpinnerProps = {
  limitTimeout: 10,
  delay: 0,
}

app.use(Spinner, options)
```

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

# 2. options
| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| limitTime | Number | <code>10</code> | false | 스피너가 보여진 이후 <code>hide()</code> 메서드 호출이 없을 경우 표시되는 최대 시간(초 단위) |
| delay | Number | <code>0</code> | false | <code>show()</code> 실행시 지연 시간 설정 (초 단위) |

# 3. API methods
### <code>show(msg?: string)</code>
* 스피너 레이아웃을 표시합니다.
```javascript
Spinner.show()
// or
Spinner.show('please wait...')
```

### <code>hide()</code>
* 스피너 레이아웃을 즉시 숨깁니다.
```javascript
Spinner.hide()
```

### <code>delay(time: number)</code>
* 메서드 실행을 딜레이 시켜 줍니다. (Promise)
```javascript
await Spinner.delay(2).show() // 2초 후 스피너 표시
await Spinner.delay(10).hide() // 스피너가 표시 중이라면 10초 후 숨김
```

### <code>timeout(time: number)</code>
* limitTimeout 설정을 변경 합니다.
```javascript
await Spinner.timeout(5).show() // 5초 후 스피너가 표시 중이라면 숨김
```

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/vue3/tree/main/src)