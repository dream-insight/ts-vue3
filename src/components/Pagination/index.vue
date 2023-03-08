<script setup lang="ts">
import { ref, watch } from 'vue'

interface PaginationItem {
  num: number
  isOn: boolean
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()
const props = withDefaults(defineProps<{
  modelValue: number;
  size?: number;       // 한 페이지 당 데이터 수량
  block?: number;      // 표시 할 페이지 번호 개수
  total?: number;      // 데이터의 총 수량
  addClass?: string;
  inline?: boolean;
}>(), {
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
  <div :class="['Page navigation', { inline }]">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(1)">
          <i class="fas fa-angles-left"></i>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(prev)">
          <i class="fas fa-angle-left"></i>
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
          <i class="fas fa-angle-right"></i>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="updateValue(maxPage)">
          <i class="fas fa-angles-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'Pagination' }
</script>