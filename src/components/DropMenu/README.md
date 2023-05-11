# DropMenu component

# 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-props)
3. [Slots](#3-그-외)
4. [그 외](#4-그-외)

---

# 1. 사용방법

## 1.1. 전역 선언
```typescript
import DropMenu from '@/components/DropMenu'

app.component('DropMenu', DropMenu)
```

## 1.2.
```vue
<template>
  <div class="wrap">
    <div class="row">
      <div class="col">
        <DropMenu :width="200" :items="dropMenuItem">
          <Button icon-right icon="expand_more" color="primary">드롭 메뉴 보기</Button>
        </DropMenu>
      </div>
      <div class="col">
        <DropMenu :position="dropMenuPosition.right" :transition="dropMenuTransition.fade" :items="dropMenuItem">
          <Button icon-right icon="expand_more" color="primary">드롭 메뉴 보기</Button>
        </DropMenu>
      </div>
      <div class="col">
        <DropMenu :width="200" :position="dropMenuPosition.left" :transition="dropMenuTransition.scale" :items="dropMenuItem">
          <Button icon-right icon="expand_more" color="primary">드롭 메뉴 보기</Button>
        </DropMenu>
      </div>
      <div class="col">
        <DropMenu :position="dropMenuPosition.top" :items="dropMenuItem">
          <Button icon-right icon="expand_more" color="primary">드롭 메뉴 보기</Button>
        </DropMenu>
      </div>
  </div>
</template>
```

:arrow_up: [항목](#항목)

---

# 2. Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| items | [DropMenuItem](#41-DropMenuItem) | <code>none</code> | 드롭다운 메뉴 목록 |
| position? | [DropMenuPosition](#42-DropMenuPosition-with-enum) | <code>bottom</code> | 메뉴가 보여질 위치 |
| transition? | [DropMenuTransition](#43-DropMenuTransition-with-enum) | <code>slide</code> | 애이메이션 종류 |
| width? | number | <code>none</code> | 드롭 메뉴의 넓이를 강제로 지정 |


---

# 3. Slots

## 3.1. default

* 버튼, 텍스트 등등 메뉴를 활성화 시키기 위한 외부 컴포넌트 및 테그

### 3.1.1. Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| toggle | boolean | <code>false</code> | 드롭메뉴 내부에서 발생하는 메뉴 토글 상태를 전달하는 변수 |

:arrow_up: [항목](#항목)

---

# 4. Types
## 4.1. DropMenuItem
```js
interface DropMenuItem {
  text: string
  action: Function
}
```

## 4.2. DropMenuPosition with enum
```js
export const dropMenuPosition = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const

export type DropMenuPosition = typeof dropMenuPosition[keyof typeof dropMenuPosition]
```

## 4.3. DropMenuTransition with enum
```js
export const dropMenuTransition = {
  slide: 'drop-menu-slide',
  fade: 'drop-menu-fade',
  scale: 'drop-menu-scale',
} as const

export type DropMenuTransition = typeof dropMenuTransition[keyof typeof dropMenuTransition]
```

:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)

--

### UPDATE HISTORY

* 최초 작성: 2023.04.24 김종윤 수석 매니저