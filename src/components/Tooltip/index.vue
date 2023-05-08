<script setup lang="ts">
import { ref, computed, useSlots, withDefaults } from 'vue'

const slots = useSlots()
const props = withDefaults(defineProps<{
  title?: string
  message: string | string[]
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  width?: number
  hovering?: boolean
  btnClose?: boolean
  icon?: string
  iconSize?: string
}>(), {
  left: false,
  right: false,
  top: false,
  bottom: false,
  width: 300,
  hovering: false,
  btnClose: false,
  icon: 'help',
  iconSize: '',
})

let position = ref<string>('')
let isShow = ref<boolean>(false)

const showIcon = computed<boolean>(() => slots.default !== undefined)

const onMouse = (show: boolean): void => {
  if (props.hovering) {
    isShow.value = show
  }
}

const toggle = (): void => {
  if (!props.hovering) {
    isShow.value = !isShow.value
  }
}

const close = (): void => {
  isShow.value = false
}

if (props.top) {
  position.value = 'top'
} else if (props.left) {
  position.value = 'left'
} else if (props.right) {
  position.value = 'right'
} else {
  position.value = 'bottom'
}
</script>

<template>
  <div
    class="tooltip-wrap"
    @mouseenter="onMouse(true)"
    @mouseleave="onMouse(false)">
    <div class="icon-wrap">
      <slot v-if="showIcon" class="pointer" @click="toggle"></slot>
      <span
        class="icon material-icons"
        :style="{ fontSize: props.iconSize }"
        @click="toggle" v-else>
        {{ props.icon }}
      </span>
    </div>

    <Transition name="tooltip">
      <div
        :class="['message-box', position]"
        :style="[{ width: `${width}px` }]"
        v-if="isShow">
        <div class="title">
          <h5 v-if="props.title">{{ props.title }}</h5>
          <a href="#" @click.stop.prevent="close" v-if="props.btnClose">
            <span class="material-icons">close</span>
          </a>
        </div>

        <template v-if="Array.isArray(message)">
          <ul>
            <li
              :key="`tooltip-message-list-${msg}`"
              v-for="msg in message">
              {{ msg }}
            </li>
          </ul>
        </template>
        <template v-else>
          {{ message }}
        </template>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'Tooltip' }
</script>