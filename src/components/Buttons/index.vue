<script setup lang="ts">
import { h, computed, defineEmits } from 'vue'
import type { VNode } from 'vue'
import type { BtnColors } from './types'

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()

const props = withDefaults(defineProps<{
  color: BtnColors
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

const buttonStyle = computed<any>(() => {
  return [
    'btn',
    props.onlyIcon ? `icon ${props.color}` : `${props.color}`,
    props.icon ? (props.iconRight ? 'right' : 'left') : '',
    {
      small: props.small && !props.icon,
      outline: props.outline,
      disabled: props.disabled,
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

const options: any = {
  class: buttonStyle.value,
  onClick: (event: MouseEvent): void => {
    event.preventDefault()

    if (!props.disabled) {
      emit('click', event)
    }
  }
}

if (props.tag.toLowerCase() === 'a') {
  options.href = hrefState.value
} else if (props.tag.toLowerCase() == 'button') {
  options.type = 'button'
}

const WrapperTag = computed<VNode>(() => h(props.tag, options))
</script>

<template>
  <WrapperTag>
    <div class="btn-wrap">
      <template v-if="!onlyIcon">
        <template v-if="props.loading">
          <i class="loading material-icons">workspaces_filled</i>
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