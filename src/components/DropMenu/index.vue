<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { DropMenuItem, DropMenuPosition, DropMenuTransition } from './types'
import { dropMenuPosition, dropMenuTransition } from './types'

const props = withDefaults(defineProps<{
  items: DropMenuItem[]
  position?: DropMenuPosition
  transition?: DropMenuTransition
  width?: number
}>(), {
  position: dropMenuPosition.bottom,
  transition: dropMenuTransition.slide
})

const transitionName = computed<string>(() => `${props.transition}-${props.position}`)

const dropMenu = ref<HTMLDivElement>()
let isShow = ref<boolean>(false)

const toggle = (): void => {
  isShow.value = !isShow.value
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (!dropMenu.value?.contains(target)) {
      isShow.value = false
    }
  })
})
</script>

<template>
  <div ref="dropMenu" class="drop-menu" @click="toggle">
    <slot></slot>

    <Transition :name="transitionName">
      <ul
        :style="{ width: width && `${width}px` }"
        :class="['drop-menu-wrap', props.position]"
        v-show=isShow>
        <li v-for="(item, i) in props.items">
          <a href="#" @click.prevent="item.action">{{ item.text }}</a>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'DropMenu' }
</script>