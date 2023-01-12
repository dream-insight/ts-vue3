<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits, withDefaults } from 'vue'

interface SelectorEmits {
  (e: 'selected', value: number): void
}

interface SelectorProps {
  date: number
  max?: number
  isShow: boolean
}

const emit = defineEmits<SelectorEmits>()
const props = withDefaults(defineProps<SelectorProps>(), {
  max: 0
})

// 목록
const el = ref<HTMLElement | null>(null)
let items = ref<number[]>([])

watch(() => props.max, (v) => {
  if (v > 0) {
    for (let i: number = v; i >= 1900; i--) {
      items.value.push(i)
    }
  }
})

watch(() => props.isShow, (v) => {
  if (v) {
    setTimeout(() => {
      if (el.value !== null) {
        const li: HTMLLIElement | null = el.value.querySelector('li.active')
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
  if (props.max > 0) {
    for (let i = props.max; i >= 1900; i--) {
      items.value.push(i)
    }
  }

  for (let i = 0; i < 12; i++) {
    items.value.push(i)
  }
})
</script>

<template>
  <transition appear name="trans-slide-down">
    <div :class="['selector-box', { month: max === 0 }]">
      <div class="selector-box-wrap">
        <div class="arrow"></div>
        <ul ref="el">
          <li
            :class="{ active: num == date }"
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
  </transition>
</template>