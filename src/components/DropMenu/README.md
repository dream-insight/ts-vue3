# DropMenu component

# 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-props)
3. [그 외](#3-그-외)

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
|-------|---- |---------|-------------|
| items | [DropMenuItem](#1-DropMenuItem) | <code>none</code> | 드롭다운 메뉴 목록 |
| position? | [DropMenuPosition](#2-DropMenuPosition-with-enum) | <code>bottom</code> | 메뉴가 보여질 위치 |
| transition? | [DropMenuTransition](#3-DropMenuTransition-with-enum) | <code>slide</code> | 애이메이션 종류 |
| width? | number | <code>none</code> | 드롭 메뉴의 넓이를 강제로 지정 |


---

# 3. Types
## 1. DropMenuItem
```js
interface DropMenuItem {
  text: string
  action: Function
}
```

## 2. DropMenuPosition with enum
```js
export const dropMenuPosition = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const

export type DropMenuPosition = typeof dropMenuPosition[keyof typeof dropMenuPosition]
```

## 3. DropMenuTransition with enum
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