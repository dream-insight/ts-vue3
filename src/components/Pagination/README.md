# Pagination Component

# 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-props)

# 1. 사용방법
* 해당 페이지네이션은 Bootstrap v5.2 기반으로 작성 되어있습니다. [Bootstrap](https://getbootstrap.kr/docs/5.2/components/spinners/)

## 1.1. 전역 선언
```typescript
import Pagination from '@/components/pagination'

app.component('Pagination', Pagination)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
import { ref } from 'vue'

let total = ref<number>(16723)
let pageSize = ref<number>(10)
let page = ref<number>(1)
</script>

<template>
  <p>현제 페이지는 {{ page }} 입니다.</p>
  <div class="wrap">
    <Pagination :total="total" :size="pageSize" v-model="page" />
  </div>
</template>

<style>
/* 부트스트랩이 필요하다면 */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css');

.wrap {
  width: 90%;
  margin: auto;
}
</style>
```

# 2. Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | number | <code>none</code> | page 번호 (v-model) |
| total? | number | <code>0</code> | 페이지 넘버링을 만들 전체 수량 |
| size? | number | <code>10</code> | 페이지당 나눌 크키 (total / size) |
| block? | number | <code>10</code> | 페이지 넘버링 수량 |

## 3. 그 외
### Fontawsome 과 함께 사용하여야 icon 표시 가능
```css
@import url("https://use.fontawesome.com/releases/v5.4.2/css/all.css");
```
> Fontawesome component는 표시 안되는 오류로 인해 사용 불가(추후 수정 가능)

:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)