# Tabs Component

# 항목

1. [사용방법](#1-사용방법)
2. [Options](#2-options)

---

# 1. 사용방법

## 1.1. 전역 선언
```typescript
import Tabs from '@/components/Tabs'

app.component('Tabs', Tabs)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
const tabItems: string = ['탭 1', '탭 2', '탭 3']
</script>

<template>
  <Tabs :tab-items="tabItems">
    <div class="item1">
      탭 1 내용
    </div>
    <div class="item2">
      탭 2 내용
    </div>
    <div class="item3">
      탭 3 내용
    </div>
  </Tabs>
</template>
```
* 탭의 내용과 상관 없이 <code>tabItems</code> 배열의 수 만큼 <code>slot</code>에 DOM 배치 해야한다.

:arrow_up: [항목](#항목)

---

# 2. options
| Name | Type | Default | Description |
|-------|---- |---------|-------------|
| tabItems | string[] | <code>[]</code> | 표시될 탭의 이름 나열 |
| inBox? | boolean | <code>false</code> | 탭 내에 표시되는 내용을 border 1px로 감싸서 표시하여 보여준다. |


:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)

### UPDATE HISTORY

* 최초 작성: 2023.03.08 김종윤 수석 매니저
