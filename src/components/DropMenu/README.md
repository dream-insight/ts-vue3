# DropMenu component

# 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-props)
3. [Slots](#3-slots)
4. [Types](#4-types)

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
| color? | [DropMenuColors](#44-dropmenucolors-with-enum) | <code>none</code> | 드롭 메뉴의 넓이를 강제로 지정 |


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
  icon?: string
}
```

## 4.2. DropMenuPosition with Enum
```js
export const dropMenuPosition = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const

export type DropMenuPosition = typeof dropMenuPosition[keyof typeof dropMenuPosition]
```

## 4.3. DropMenuTransition with Enum
```js
export const dropMenuTransition = {
  slide: 'drop-menu-slide',
  fade: 'drop-menu-fade',
  scale: 'drop-menu-scale',
} as const

export type DropMenuTransition = typeof dropMenuTransition[keyof typeof dropMenuTransition]
```

## 4.4. DropMenuColors with Enum
```js
export const dropMenuColors = {
  primary: 'primary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  secondary: 'secondary',
  dark: 'dark',
} as const

export type DropMenuColors = typeof dropMenuColors[keyof typeof dropMenuColors]
```

:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)

--

### UPDATE HISTORY

* 최초 작성: 2023.04.24 김종윤 수석매니저
* props color 추가, 메뉴 icon 옵션 추가: 2023.05.12 김종윤 수석매니저