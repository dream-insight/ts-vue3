<script setup lang="ts">
import { h, ref, computed, useSlots, withDefaults, Fragment } from 'vue'
import type { VNode } from 'vue'

const slots = useSlots()

const props = withDefaults(defineProps<{
  tabItems: string[]
  inBox?: boolean
}>(), {
  inBox: false,
})

const RenderSlotItems = computed<VNode>(() => h(Fragment, slots.default ? [slots.default()[active.value]] : []))

const Tabs = ref<HTMLDivElement>()
let active = ref<number>(0)
let transition = ref<string>('tab-slide-left')

/**
 * 탭 항목을 클릭 할때 현재 인덱스 값 및 transition 스타일 변경
 *
 * @param index 선택된 탭 index
 */
const setIndex = (index: number): void => {
  transition.value = (active.value < index) ? 'tab-slide-left' : 'tab-slide-right'
  active.value = index

  const contents = Tabs.value!.querySelectorAll('.tab-contents') as NodeListOf<HTMLElement>
  const rect = contents[0].firstElementChild?.getBoundingClientRect() as DOMRect

  contents[0].style.overflow = 'hidden'
  contents[0].style.height = `${rect.height + 8}px`
}

/**
 * tab-contents의 높이를 초기화 시켜준다
 */
const resetHeight = (): void => {
  const contents = Tabs.value!.querySelectorAll('.tab-contents') as NodeListOf<HTMLElement>
  contents[0].style.overflow = 'unset'
  contents[0].style.height = 'unset'
}
</script>

<template>
  <div ref="Tabs" class="tabs">
    <div class="tab-item-wrap">
      <ul class="tab-items">
        <li
          :class="{ active: index === active }"
          @click="setIndex(index)"
          v-for="(item, index) in props.tabItems">
          {{ item }}
        </li>
      </ul>
    </div>
    <div :class="['tab-contents', props.inBox ? 'in-box' : '']">
      <TransitionGroup :name="transition" mode="out-in" @after-enter="resetHeight()">
        <RenderSlotItems />
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'Tabs' }
</script>