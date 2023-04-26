# Tooltip component

# 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-props)
3. [그 외](#3-그-외)

---

# 1. 사용방법
* 해당 컴포넌트에서 사용되는 아이콘은 FontAwesome v5.x 입니다. [링크](https://fontawesome.com/v5/search?o=r&m=free)

## 1.1. 전역 선언
```typescript
import Tooltip from '@/components/Tooltip'

app.component('Tooltip', Tooltip)
```

## 1.2.
```vue
<script setup lang="ts">
import { ref } from 'vue'

let message = ref<string[]>([
  '아래에서 나오는 메시지',
  '매시지를 목록으로 전달 가능'
])
</script>

<template>
  <div class="wrap">
    <p>
      <Tooltip top message="위에 나오는 메시지" />
    </p>
    <p>
      <Tooltip right message="오른쪽에 나오는 메시지" />
    </p>
    <p>
      <Tooltip left width="200" message="왼쪽에 나오는 메시지">
        slot 활용가능
        <i class="fas fa-question-circle"></i>
      </Tooltip>
    </p>
    <p>
      <Tooltip :message="message">
        <i class="fas fa-question-circle"></i>
        slot 활용가능
      </Tooltip>
    </p>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  padding: 200px;
  text-align: center;
}
</style>
```

:arrow_up: [항목](#항목)

---

# 2. Props
| Name | Type | Default | Description |
|-------|---- |---------|-------------|
| message | string, string[] | <code>none</code> | 툴팁 메시지, 배열입력시 리스트 형태로 출력 |
| left? | boolean | <code>false</code> | 메시지를 왼쪽에 표시 |
| right? | boolean | <code>false</code> | 메시지를 오른쪽에 표시 |
| top? | boolean | <code>false</code> | 메시지를 위쪽에 표시 |
| bottom? | boolean | <code>true</code> | 메시지를 아랫쪽에 표시 |
| width? | number | <code>300</code> | 메시지를 box의 최대 넓이(px 단위) |

## 3. 그 외
### Fontawsome 과 함께 사용하여야 icon 표시 가능
```css
@import url("https://use.fontawesome.com/releases/v5.4.2/css/all.css");
```
> Fontawesome component는 표시 안되는 오류로 인해 사용 불가(추후 수정 가능)

:arrow_up: [항목](#항목)

---

### UPDATE HISTORY

* 최초 작성: 2023.02.23 김종윤 수석 매니저
* 제목 및 닫기 버튼 기능 추가: 2023.04.19 김종윤 수석 매니저

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)
