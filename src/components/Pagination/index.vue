<script setup lang="ts">
import { ref, watch, defineEmits, defineProps, withDefaults } from 'vue'

interface PaginationEmits {
  (e: 'update:modelValue', value: string | number): void
}

interface PaginationProps {
  modelValue: number;
  size?: number;       // 한 페이지 당 데이터 수량
  block?: number;      // 표시 할 페이지 번호 개수
  total?: number;      // 데이터의 총 수량
  addClass?: string;
  inline?: boolean;
}

interface PaginationItem {
  num: number;
  isOn: boolean;
}

const emit = defineEmits<PaginationEmits>()
const props = withDefaults(defineProps<PaginationProps>(), {
  size: 20,
  block: 10,
  total: 0,
  inline: false
})

let pageList = ref<PaginationItem[]>([])
let nowPage = ref<number>(1)
let maxPage = ref<number>(1)
let pageBlock = ref<number>(10)
let startPage = ref<number>(1)
let endPage = ref<number>(1)
let prev = ref<number>(0)
let next = ref<number>(0)

watch(() => props.total, () => {
  makePageList()
})

watch(() => props.size, () => {
  makePageList()
})

watch(() => props.block, () => {
  makePageList()
})

watch(() => props.modelValue, (v) => {
  if (nowPage.value !== v && v) {
    makePageList()
    nowPage.value = v
  }
})

const makePageList = (): void => {
  pageList.value = []
  maxPage.value = Math.ceil(props.total / props.size)
  startPage.value = Math.floor((nowPage.value - 1) / pageBlock.value) * pageBlock.value + 1
  endPage.value = ((startPage.value + pageBlock.value - 1) > maxPage.value) ? maxPage.value : (startPage.value + pageBlock.value - 1)

  if (endPage.value === 0) {
    endPage.value = 1
  }

  prev.value = (startPage.value - 1 > 0) ? startPage.value - 1 : 1
  next.value = (startPage.value + pageBlock.value <= maxPage.value) ? endPage.value + 1 : maxPage.value

  for (let num = startPage.value; num <= endPage.value; num++) {
    pageList.value.push({
      num,
      isOn: (nowPage.value === num) ? true : false
    })
  }
}

const updateValue = (v: number): void => {
  if (v !== nowPage.value) {
    nowPage.value = v
    emit('update:modelValue', v)

    makePageList()
  }
}

if (props.block) {
  pageBlock.value = props.block
}

nowPage.value = props.modelValue
makePageList()
</script>

<template>
  <!-- bootstrap pagination -->
  <nav :class="['page navigation', { inline }]">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(1)">
          <FontAwesomeIcon :icon="['fas', 'angle-double-left']" />
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(prev)">
          <FontAwesomeIcon :icon="['fas', 'angle-left']" />
        </a>
      </li>

      <li
        :class="['page-item', { active: v.num === nowPage }]"
        :key="`page-key-${v.num}`"
        v-for="v in pageList">
        <a class="page-link" href="#" @click.prevent="updateValue(v.num)">{{ v.num }}</a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(next)">
          <FontAwesomeIcon :icon="['fas', 'angle-right']" />
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(maxPage)">
          <FontAwesomeIcon :icon="['fas', 'angle-double-right']" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default {
  name: 'Pagination'
}
</script>