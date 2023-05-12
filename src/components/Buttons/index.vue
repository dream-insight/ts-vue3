<script setup lang="ts">
import { reactive, h, computed, defineEmits, useSlots } from 'vue'
import type { VNode } from 'vue'
import type { BtnColors } from './types'

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()

const props = withDefaults(defineProps<{
  color?: BtnColors
  class?: string
  href?: string
  text?: boolean
  icon?: string
  iconRight?: boolean
  onlyIcon?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  small?: boolean
  outline?: boolean
  tag?: string
  dropMenuToggle?: boolean
}>(), {
  href: '#',
  text: false,
  right: false,
  block: false,
  onlyIcon: false,
  loading: false,
  disabled: false,
  iconRight: false,
  small: false,
  outline: false,
  tag: 'a',
  dropMenuToggle: false,
})

const slots = useSlots()
const defaultSlot = slots.default ? slots.default()[0] : null

const buttonStyle = computed<any>(() => {
  return [
    'btn',
    props.text && 'text',
    !props.outline && props.color,
    props.onlyIcon && 'icon',
    !props.onlyIcon && props.icon ? (props.iconRight ? 'right' : 'left') : '',
    {
      small: props.small,
      outline: props.outline,
      block: !props.small && props.block,
    },
    props.class,
  ]
})

const hrefState = computed<string>(() => {
  if (!props.disabled) {
    return props.href ? props.href : '#'
  }

  return ''
})

const options = reactive<any>({
  class: buttonStyle.value,
  onClick: (event: MouseEvent): void => {
    event.preventDefault()

    if (!props.disabled) {
      emit('click', event)
    }
  }
})

if (props.tag.toLowerCase() === 'a') {
  options.href = hrefState.value
} else if (props.tag.toLowerCase() == 'button') {
  options.type = 'button'
}

const WrapperTag = computed<VNode>(() => h(props.text ? 'a' : props.tag, options))
</script>

<template>
  <WrapperTag :class="{ disabled: props.disabled }">
    <div class="btn-wrap">
      <template v-if="!onlyIcon">
        <template v-if="props.loading">
          <i class="loading mdi mdi-google-circles-extended"></i>
        </template>
        <template v-else>
          <template v-if="props.icon">
            <i :class="['mdi', props.icon, { rotate: props.dropMenuToggle }]" v-if="props.icon && !props.iconRight"></i>
            <slot></slot>
            <i :class="['mdi', props.icon, { rotate: props.dropMenuToggle }]" v-if="props.icon && props.iconRight"></i>
          </template>
          <template v-else>
            <slot></slot>
          </template>
        </template>
      </template>
      <template v-else>
        <i :class="['mdi', props.icon]"></i>
      </template>
    </div>
  </WrapperTag>
</template>

<style lang="scss">
@import './style.scss';
</style>
<script lang="ts">
export default { name: 'Button' }
</script>