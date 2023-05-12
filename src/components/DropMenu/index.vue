<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { StyleValue } from 'vue'
import type { DropMenuItem, DropMenuPosition, DropMenuTransition, DropMenuColors } from './types'
import { dropMenuPosition, dropMenuTransition, dropMenuColors } from './types'

const props = withDefaults(defineProps<{
  items: DropMenuItem[]
  position?: DropMenuPosition
  transition?: DropMenuTransition
  width?: number
  color?: DropMenuColors
}>(), {
  position: dropMenuPosition.bottom,
  transition: dropMenuTransition.slide,
  color: dropMenuColors.primary,
})

const transitionName = computed<string>(() => `${props.transition}-${props.position}`)
const wrapperWidth = computed<StyleValue>(() => ({ width: !!props.width ? `${props.width}px` : '' }))

const dropMenu = ref<HTMLDivElement>()
let isShow = ref<boolean>(false)

const toggle = (): void => {
  isShow.value = !isShow.value
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (!dropMenu.value!.contains(target)) {
      isShow.value = false
    }
  })
})
</script>

<template>
  <div ref="dropMenu" :class="['drop-menu', props.color]" @click="toggle">
    <slot :toggle="isShow"></slot>

    <Transition :name="transitionName">
      <ul
        :style="wrapperWidth"
        :class="['drop-menu-wrap', props.position]"
        v-show=isShow>
        <li v-for="(item, i) in props.items">
          <a href="#" @click.prevent="item.action">
            <span>{{ item.text }}</span>
            <i :class="`mdi mdi-${item.icon}`" v-if="item.icon"></i>
          </a>
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