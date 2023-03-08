<script setup lang="ts">
import { ref } from 'vue'

export interface SortingCellEmits {
  (event: 'sorting', value: string): void
}

export interface SortingCellProps {
  target: string
  text: string
}

const emit = defineEmits<SortingCellEmits>()
const props = defineProps<SortingCellProps>()

let sorting = ref<boolean>(true)

const changeSorting = (): void => {
  sorting.value = !sorting.value
  emit('sorting', `${props.target} ${(sorting.value ? 'desc' : 'asc')}`)
}
</script>

<template>
  <div class="sort-wrap">
    <span>{{ text }}</span>
    <a
      href="#"
      :class="['sorting', { rotate: !sorting }]"
      @click.prevent="changeSorting">
      <i name="fas fa-arrow-down"></i>
    </a>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>