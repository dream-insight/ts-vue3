<script setup lang="ts">
import { ref, computed, defineProps, useSlots, withDefaults } from 'vue'

export interface TooltipProps {
  message: string | string[]
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  width?: number
}

const slots = useSlots()
const props = withDefaults(defineProps<TooltipProps>(), {
  left: false,
  right: false,
  top: false,
  bottom: false,
  width: 300
})

let position = ref<string>('')
let isShow = ref<boolean>(false)

const showIcon = computed<boolean>(() => slots.default !== undefined)

const onMouse = (show: boolean): void => {
  isShow.value = show
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
  <div class="tooltip-wrap" @mouseenter="onMouse(true)" @mouseleave="onMouse(false)">
    <slot v-if="showIcon"></slot>
    <FontAwesomeIcon class="icon" :icon="['fas', 'question-circle']" v-else />

    <transition name="tooltip">
      <div
        :class="['message-box', position]"
        :style="[{ width: `${width}px` }]"
        v-if="isShow">
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
    </transition>
  </div>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'Tooltip' }
</script>