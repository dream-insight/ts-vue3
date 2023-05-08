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
  tag: 'a'
})

const buttonStyle = computed<any>(() => {
  return [
    'btn',
    props.class,
    props.onlyIcon ? `icon ${props.color}` : `${props.color}`,
    props.icon ? (props.iconRight ? 'right' : 'left') : '',
    {
      disabled: props.disabled,
      small: props.small && !props.icon,
      block: !props.small && props.block,
      outline: props.outline,
    },
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
            <i class="material-icons" v-if="props.icon && !props.iconRight">{{ props.icon }}</i>
            <slot></slot>
            <i class="material-icons" v-if="props.icon && props.iconRight">{{ props.icon }}</i>
          </template>
          <template v-else>
            <slot></slot>
          </template>
        </template>
      </template>
      <template v-else>
        <i class="material-icons">{{ props.icon }}</i>
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