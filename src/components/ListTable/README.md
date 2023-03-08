# ListTable component

# 1. 사용방법
```javascript
// main.js
import ListTable from '@/components/ListTable'

Vue.component('ListTable', ListTable)
```

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

# 2. Prop
| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| items | Any[] | <code>[]</code> | *true* | 출력할 목록 배열 |
| header | TableHeader[], TableHeader[][] | <code>[]</code> | *true* | 테이블 최상단 컬럼 제목, 2차원배열로 지정할 경우 컬럼 제목을 2줄로 표시 |
| footer | TableFooter | <code>{}</code> | false | 출력할 목록 배열 |
| emptyText | String | <code>''</code> | false | 목록이 없을 경우 표시되는 텍스트 |
| noHoverBg | Boolean | <code>false</code> | false | 목록에 마우스가 올라갈경우 라인에 표시되는 색상 표시 여부 |
| checkAll | Boolean | <code>false</code> | false | 전체 체크 버튼을 표시 해줌 |
| multiHeader | Boolean | <code>false</code> | false | 여러줄의 컬럼 제목을 지정할때 필수 적용 옵션 |

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

## { data, target, order } sort-change


---

:arrow_left: [컴포넌트 목록으로이동](https://github.com/dream-insight/vue3/tree/main/src)