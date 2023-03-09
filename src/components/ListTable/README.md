# ListTable component

## 항목

1. [사용방법](#1-사용방법)
2. [Props](#2-prop)
3. [Event](#3-event)
4. [Types](#4-types)

---
# 1. 사용방법

## 1.1. 전역 선언
```typescript
// main.js
import ListTable from '@/components/ListTable'

Vue.component('ListTable', ListTable)
```

## 1.2. 사용 예제
```vue
<script setup lang="ts">
import type { TableHeader } from '@/components/ListTable/types'

interface ListItem {
  no: number
  name: string
  tel: string
  date: string
}

const list: ListItem[] = [
  { no: 1, name: '홍길동', tel: '01022223333', date: '2022-11-11' },
  { no: 2, name: '심청이', tel: '01022223333', date: '2022-11-11' },
  { no: 3, name: '임꺽정', tel: '01022223333', date: '2022-11-11' },
  { no: 4, name: '이순신', tel: '01022223333', date: '2022-11-11' },
]

const tableHeader: TableHeader[] = [
  { text: 'No.', width: '80' },
  { text: '이름', width: '' },
  { text: '전화번호', width: '' },
  { text: '등록일', width: '' },
]
</script>

<template>
  <div class="wrap">
    <TableList :header="tableHeader" :items="list">
      <template v-slot:items="{ props, index }">
        <tr>
          <td>{{ props.no }}</td>
          <td>{{ props.name }}</td>
          <td>{{ props.tel }}</td>
          <td>{{ props.date }}</td>
        </tr>
      </template>
    </TableList>
  </div>
</template>
```

:arrow_up: [항목](#항목)

---

# 2. Prop
| Name | Type | Default | Description |
|-------|---- |---------|-------------|
| items | [TableItems[]](#43-tableitems) | <code>[]</code> | 출력할 목록 배열 |
| header | [TableHeader[], TableHeader[][]](#41-tableheader) | <code>[]</code> | 테이블 최상단 컬럼 제목, 2차원배열로 지정할 경우 컬럼 제목을 2줄로 표시 |
| footer? | [TableFooter[]](#42-tablefooter) | <code>[]</code> | 출력할 목록 배열 |
| multiHeader? | boolean | <code>false</code> | 여러줄의 컬럼 제목을 지정할때 필수 적용 옵션 |
| emptyText? | string | <code>''</code> | 목록이 없을 경우 표시되는 텍스트 |
| noHoverBg? | boolean | <code>false</code> | 목록에 마우스가 올라갈경우 라인에 표시되는 색상 표시 여부 |
| checkAll? | boolean | <code>false</code> | 전체 체크 버튼을 표시 해줌 |

:arrow_up: [항목](#항목)

---

# 3. Event

## Boolean checked
* checkAll 옵션이 있는 경우 테이블 컬럼 제목의 <code>checkbox</code>를 클릭하면 발생하는 이벤트
```vue
<script stup lang="ts">
const listCheck = (evt: boolean): void => {
  // todo
}
</script>

<template>
  <TableList check-all :header="tableHeader" :items="list" @checked="listCheck($event)">
    <template v-slot:items="{ props }">
    </template>
  </TableList>
</template>
```

## sort-change(): [SortingChangeData](#44-sortingchangedata)

:arrow_up: [항목](#항목)

---

# 4. Types

## 4.1. TableHeader
```typescript
export interface TableHeader {
  text: string
  width?: number | string
  align?: string
  sort?: boolean
  target?: string
  order?: string
  colspan?: number
  rowspan?: number
}
```

## 4.2. TableFooter
```typescript
interface KeyIndex {
  [index: string]: any
}

type FootAlign = 'center' | 'left' | 'right'
type FootItemTag = 'td' | 'th'

export interface TableFooter {
  colspan?: number
  align?: FootAlign
  tag?: string
  value: FootItemTag
}
```

## 4.3. TableItems
```typescript
export interface TableItems extends KeyIndex {}
```

## 4.4. SortingChangeData
```typescript
export interface SortingChangeData {
  data: TableItems[]
  target: string
  order: string
}
```

:arrow_up: [항목](#항목)

---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/ts-vue3/components)