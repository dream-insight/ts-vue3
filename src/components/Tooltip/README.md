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

const message = ref<string[]>([
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
| bottom? | boolean | <code>true</code> | 메시지를 아래쪽에 표시 |
| width? | number | <code>300</code> | 메시지를 box의 최대 넓이(px 단위) |
| hovering? | boolean | <code>false</code> | slot 요소를 클릭하지 않고 hover 되었을때 보여지도록 설정 |
| btnClose? | boolean | <code>false</code> | 닫기 버튼 보여지기 |
| icon? | string | <code>help</code> | 사용자 지정 아이콘 표시 (google material icons) |
| iconSize? | string | <code>''</code> | 표시될 아이콘의 사이즈 (px, em 등 단위 필수) |

---

## 3. 그 외
- Google Material Icons 과 함께 사용하여야 icon 표시 가능 [링크](https://fonts.google.com/icons?selected=Material+Icons+Outlined:arrow_circle_up:&icon.query=arrow&icon.set=Material+Icons)


:arrow_up: [항목](#항목)

---

### UPDATE HISTORY

* 최초 작성: 2023.02.23 김종윤 수석매니저
* 제목 및 닫기 버튼 기능 추가: 2023.04.19 김종윤 수석매니저
* 아이콘 지정 기능 추가: 2023.05.04 김종윤 수석매니저

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)
