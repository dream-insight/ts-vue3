<script setup lang="ts">
/**
 * 해당 컴포넌트는 정렬기능을 활성화 시킨 상태에서
 * 라인당 추가되는 하위 데이터에 대한 변화를 감지 하지 못합니다.
*/
import { ref, watch, watchEffect, computed, onMounted } from 'vue'
import type { ListTableHeader, ListTableItem, ListTableFooter, SortingChangeData } from './types'

export interface ListTableEmits {
  (event: 'checked', value: boolean): void
  (event: 'sort-change', value: SortingChangeData): void
  (event: 'observe'): void
}

export interface ListTableProps {
  items: ListTableItem[]
  header: ListTableHeader[] | ListTableHeader[][]
  footer?: ListTableFooter[]
  emptyText?: string
  noHoverBg?: boolean
  multiHeader?: number
  checkAll?: boolean
  width?: string | number
  height?: string | number
  observer?: boolean
  loading?: boolean
}

const emit = defineEmits<ListTableEmits>()
const props = withDefaults(defineProps<ListTableProps>(), {
  header: (): ListTableHeader[] => [],
  footer: (): ListTableFooter[] => [],
  emptyText: '데이터가 없습니다.',
  noHoverBg: false,
  checkAll: false,
  multiHeader: 0,
  loading: false,
})

let colspan = ref<number>(0)
let tableHeader = ref<ListTableItem[]>([])
let target = ref<string | undefined>('')
let order = ref<string>('')

let dataList = ref<ListTableItem[]>([])

const listTableCheck = ref<HTMLInputElement>()

watch(() => props.header, () => setHeader())

const tableWidth = computed<string>(() => {
  if (typeof props.width  === 'number') {
    return props.width + 'px'
  } else if (props.width) {
    return props.width
  }

  return ''
})

const tableHeight = computed<string>(() => {
  if (typeof props.height  === 'number') {
    return props.height + 'px'
  } else if (props.height) {
    return props.height
  }

  return ''
})

const setHeader = (): void => {
  if (props.header.length) {
    // 정렬이 지정되어 있는 경우 해당 컬럼을 정렬해준다.
    if (props.multiHeader) {
      props.header.forEach((head, i) => {
        tableHeader.value.push([])

        tableHeader.value[i] = (<ListTableHeader[]>head).map((item) => {
          return {
            text: item.text,
            width: item.width,
            sort: item.sort ? true : false,
            target: item.target,
            colspan: !!item.colspan ? item.colspan : 0,
            rowspan: !!item.rowspan ? item.rowspan : 0,
            order: item.order,
            align: !item.align ? 'center' : item.align
          }
        })
      })
    } else {
      tableHeader.value = (<ListTableHeader[]>props.header).map((item) => {
        if (item.order) {
          order.value = item.order
          target.value = item.target
        }

        return {
          text: item.text,
          width: item.width,
          sort: item.sort,
          target: item.target,
          colspan: !!item.colspan ? item.colspan : 0,
          rowspan: !!item.rowspan ? item.rowspan : 0,
          order: item.order,
          align: !item.align ? 'left' : item.align
        }
      })
    }
  }
}

const checkAllEvent = (evt: Event): void => {
  emit('checked', (evt.target as HTMLInputElement).checked)
}

// ==================================== Scroll observer ====================================
const listTableWrap = ref<HTMLDivElement>()
const listTable = ref<HTMLTableElement>()

let observer: IntersectionObserver
let trList: NodeListOf<HTMLTableRowElement>
let trTarget: HTMLTableRowElement

const observerStart = (): void => {
  if (dataList.value.length) {
    trList = listTable.value!.querySelectorAll<HTMLTableRowElement>('tbody tr')

    // 테이블 스크롤이 마지막행에서 5번째 행을 지정
    trTarget = trList[trList.length - 5]

    const options: IntersectionObserverInit = {
      root: listTableWrap.value!,
      rootMargin: '20px 0px 0px 0px',
    }

    const callback: IntersectionObserverCallback = (ent) => {
      const { intersectionRect } = ent[0]

      if (intersectionRect.x! > 0) {
        observerStop()
        emit('observe')
      }
    }

    observer = new IntersectionObserver(callback, options)

    if (trTarget !== undefined) {
      observer.observe(trTarget)
    }
  }
}

const observerStop = (): void => {
  observer.disconnect()
}
// ==================================== Scroll observer ====================================

// ==================================== Sorting ====================================
// 원본 데이터 보존을 위한 데이터 복사
dataList.value = [...props.items]

const setSort = (t: string, o: string): void => {
  listTableWrap.value!.scrollTop = 0

  target.value = t

  if (o === 'desc') {
    order.value = 'asc'
  } else if (o === 'asc') {
    order.value = ''
  } else {
    order.value = 'desc'
  }

  if (order.value) {
    observerStop()
  } else {
    observerStart()
  }

  sorting()
}

const sortLogic = (a: ListTableItem, b: ListTableItem, target: any): number => {
  const after = a[target]
  const before = b[target]

  if (order.value === 'asc') {
    if (after > before) {
      return 1
    } else if (after < before) {
      return -1
    }
  } else {
    if (after > before) {
      return -1
    } else if (after < before) {
      return 1
    }
  }

  return 0
}

const sorting = (): void => {
  if (props.items.length && target.value) {
    if (order.value) {
      dataList.value.sort((after, before) => sortLogic(after, before, target.value))
    } else {
      dataList.value = [...props.items]
    }

    if (props.multiHeader > 0) {
      tableHeader.value.forEach((main) => {
        (<ListTableHeader[]>main).forEach(item => {
          if (item.target === target.value) {
            item.order = order.value
          } else {
            item.order = ''
          }
        })
      })
    } else {
      tableHeader.value.forEach((item) => {
        if (item.target === target.value) {
          item.order = order.value
        } else {
          item.order = ''
        }
      })
    }

    emit('sort-change', {
      data: [...dataList.value],
      target: target.value,
      order: order.value
    })
  }
}
// ==================================== Sorting ====================================

watchEffect(() => {
  if (props.items.length) {
    dataList.value = [...props.items]

    if (props.observer) {
      setTimeout(() => {
        observerStart()
      }, 1)
    }

    // if (props.checkAll && listTableCheck.value) {
    //   listTableCheck.value.checked = false
    // }
  }
})

setHeader()

if (props.multiHeader) {
  colspan.value = props.multiHeader + (props.checkAll ? 1 : 0)
} else {
  colspan.value = props.header.length + (props.checkAll ? 1 : 0)
}

onMounted(() => {
  if (props.observer && props.height && dataList.value.length) {
    observerStart()
  }
})

defineExpose({
  observerStart,
  observerStop,
})
</script>

<template>
  <div ref="listTableWrap" class="list-table" :style="{ height: tableHeight }">
    <table
      ref="listTable"
      :class="{ 'no-box-shadow': tableHeight }"
      :style="{ width: tableWidth }">
      <thead v-if="multiHeader === 0">
        <tr>
          <th width="50" v-if="checkAll">
            <label class="checkbox-wrap">
              <input ref="listTableCheck" type="checkbox" @click="checkAllEvent" />
              <span class="material-icons"></span>
            </label>
          </th>
          <th
            :width="(item.width ? item.width : '')"
            :key="'head' + item.text"
            v-for="item in tableHeader">
            <div
              :class="['columns', item.align]"
              @click="setSort(item.target, item.order)"
              v-if="item.sort">

              <div class="sort-cell-text">{{ item.text }}</div>

              <span :class="['sorting rotate', item.order]">
                <span class="order-icon"  v-if="item.order">
                  <i class="material-icons">expand_more</i>
                </span>
                <span class="order-icon" v-else>
                  <i class="material-icons">unfold_more</i>
                </span>
              </span>
            </div>
            <span v-else>{{ item.text }}</span>
          </th>
        </tr>
      </thead>
      <thead v-else>
        <th width="50" :rowspan="tableHeader.length" v-if="checkAll">
          <label class="checkbox-wrap">
            <input ref="listTableCheck" type="checkbox" @click="checkAllEvent" />
            <span class="material-icons"></span>
          </label>
        </th>
        <tr v-for="(headLine, i) in tableHeader" :key="`h${i}`">
          <th
            :colspan="item.colspan"
            :rowspan="item.rowspan"
            :width="item.width ? item.width : ''"
            :key="`th${i}${j}`"
            v-for="(item, j) in headLine">
            <div
              :class="['hand flex-row', `justify-${item.align}`]"
              @click="setSort(item.target, item.order)"
              v-if="item.sort">

              <div style="margin-right: 5px;">{{ item.text }}</div>

              <span :class="['sorting rotate', item.order]">
                <span class="order-icon" v-if="item.order">
                  <i class="material-icons">expanad_more</i>
                </span>
                <span class="order-icon" v-else>
                  <i class="material-icons">unfold_more</i>
                </span>
              </span>
            </div>
            <span v-else>{{ item.text }}</span>
          </th>
        </tr>
      </thead>

      <tbody :class="{ 'no-hover-bg': noHoverBg }" v-if="dataList.length > 0">
        <slot tag="tr" name="items" :props="item" :index="index" v-for="(item, index) in dataList"></slot>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="no-data" :colspan="colspan">
            <div class="center">{{ emptyText }}</div>
          </td>
        </tr>
      </tbody>

      <tfoot v-if="Object.keys(props.footer).length">
        <tr>
          <template v-for="(item, i) in footer">
            <th
              :colspan="item.colspan"
              :class="item.align"
              :key="`foot${i}`"
              v-if="item.tag === 'th'">
              {{ item.text }}
            </th>
            <td
              :colspan="item.colspan"
              :class="item.align"
              :key="`foot-${i}`"
              v-else>
              <b>{{ item.text }}</b>
            </td>
          </template>
        </tr>
      </tfoot>
      <tfoot v-else>
        <slot name="footer"></slot>
      </tfoot>
    </table>

    <div class="spinner" v-if="props.loading"></div>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'ListTable' }
</script>