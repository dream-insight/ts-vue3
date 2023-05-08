# Buttons component

# 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-props)
3. [그 외](#3-그-외)

---

# 1. 사용방법
* 해당 컴포넌트에서 사용되는 아이콘은 Google Material Icons 입니다. [링크](https://fonts.google.com/icons?selected=Material+Icons:replay:&icon.style=Filled&icon.set=Material+Icons)

## 1.1. 전역 선언
```typescript
import Button from '@/components/Buttons'

app.component('Button', Button)
```

## 1.2.
```vue
<template>
  <div class="wrap">
    <div class="row">
      <div class="col">
        <Button block color="primary">color: primary</Button>
      </div>
      <div class="col">
        <Button block color="success">color: success</Button>
      </div>
      <div class="col">
        <Button block color="info">color: info</Button>
      </div>
      <div class="col">
        <Button block color="warning">color: warning</Button>
      </div>
      <div class="col">
        <Button block color="danger">color: danger</Button>
      </div>
      <div class="col">
        <Button block color="dark">color: dark</Button>
      </div>
      <div class="col">
        <Button block color="secondary">color: secondary</Button>
      </div>
      <div class="col">
        <Button block color="light">color: light</Button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button block color="primary" icon="file_download">with icon (left)</Button>
      </div>
      <div class="col">
        <Button block icon-right color="success" icon="reply">with icon (right)</Button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col flex-row justify-around">
        <Button only-icon color="primary" icon="file_download"></Button>
        <Button only-icon color="success" icon="reply"></Button>
        <Button only-icon color="info" icon="east"></Button>
        <Button only-icon color="warning" icon="restart_alt"></Button>
        <Button only-icon color="danger" icon="open_in_new"></Button>
        <Button only-icon color="dark" icon="ios_share"></Button>
        <Button only-icon color="secondary" icon="save_alt"></Button>
      </div>
    </div>
  </div>
</template>
```

:arrow_up: [항목](#항목)

---

# 2. Props
| Name | Type | Default | Description |
|-------|---- |---------|-------------|
| color | [BtnColors](#31-BtnColors) | <code>none</code> | 툴팁 메시지, 배열입력시 리스트 형태로 출력 |
| class? | string | <code>none</code> | 추가되는 style sheet class |
| href? | string | <code>#</code> | 연결 링크 |
| icon? | string | <code>none</code> | 아이콘으로 사용될 Google Material Icon |
| text? | boolean | <code>false</code> | 텍스트로만 보이는 버튼 |
| iconRight? | boolean | <code>false</code> | 상입된 아이콘의 위치가 오른쪽일때 설정 |
| iconOnly? | boolean | <code>false</code> | 아이콘으로만 이루어진 버튼을 사용 |
| block? | boolean | <code>false</code> | 버튼을 전체 라인으로 지정 |
| disabled? | boolean | <code>false</code> | 버튼 사용 불가 처리 |
| small? | boolean | <code>false</code> | 버튼 최소 크기 block 옵션 무시 |
| loading? | boolean | <code>false</code> | 버튼에 스피너를 표시하고 사용 불가 상태로 변경 |
| outline? | boolean | <code>false</code> | 배경색을 제거하고 외곽선을 표시 |
| tag? | string | <code>a</code> | 버튼 태그 설정 |

---

# 3. Types
## 3.1. BtnColors
```javascript
export const btnColors = {
  primary: 'primary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  secondary: 'secondary',
  dark: 'dark',
  light: 'light'
} as const

export type BtnColors = typeof btnColors[keyof typeof btnColors]
```

:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)

--

### UPDATE HISTORY

* 최초 작성: 2023.04.20 김종윤 수석 매니저
* disabled props 추가: 2023.04.25 김종윤 수석 매니저
* outline type 추가: 2023.04.28 김종윤 수석 매니저