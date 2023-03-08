<script setup lang="ts">
import { ref, watch, onMounted, withDefaults } from 'vue'

const emit = defineEmits<{
  (event: 'selected', value: number): void
  (event: 'hide'): void
}>()
const props = withDefaults(defineProps<{
  date: number
  max?: number
  isShow: boolean
  dateType?: string
}>(), {
  max: 0,
  dateType: 'year'
})

const Selector = ref<HTMLElement>()

// 목록
const el = ref<HTMLElement>()
let items = ref<number[]>([])

watch(() => props.max, v => {
  if (v > 0) {
    items.value = []

    for (let i: number = v; i >= 1900; i--) {
      items.value.push(i)
    }
  }
})

watch(() => props.isShow, v => {
  if (v) {
    setTimeout(() => {
      if (el.value) {
        const li = el.value.querySelector('li.active') as HTMLLIElement
        const top: number = (li) ? li.offsetTop - li.offsetHeight : 0
        el.value.scrollTop = top
      }
    }, 100)
  }
})

const updateValue = (v: number): void => {
  emit('selected', v)
}

onMounted(() => {
  if (props.dateType === 'year') {
    if (props.max) {
      for (let i = props.max; i >= 1900; i--) {
        items.value.push(i)
      }
    } else {
      const maxYear = new Date().getFullYear()

      for (let i = maxYear; i >= 1900; i--) {
        items.value.push(i)
      }
    }
  } else {
    for (let i = 0; i < 12; i++) {
      items.value.push(i)
    }
  }
})
</script>

<template>
  <Transition appear name="trans-slide-down">
    <div :class="['selector-box', { month: max === 0 }]">
      <div class="selector-box-wrap">
        <div class="arrow"></div>
        <ul ref="el">
          <li
            :class="{ active: num === date }"
            :key="`date-${num}`"
            @click="updateValue(num)"
            v-for="num in items">
            <template v-if="max > 0">
              {{ num }}
            </template>
            <template v-else>
              {{ num + 1 }}
            </template>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>