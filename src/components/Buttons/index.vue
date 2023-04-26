<script setup lang="ts">
import { computed, defineEmits } from 'vue'
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
}>(), {
  href: '#',
  text: false,
  right: false,
  block: false,
  onlyIcon: false,
  loading: false,
  disabled: false,
  iconRight: false,
})

const buttonStyle = computed<any>(() => {
  return [
    'btn',
    props.class,
    props.onlyIcon ? `icon ${props.color}` : `${props.color}`,
    props.iconRight ? 'right' : 'left',
    props.disabled ? 'disabled' : '',
    { block: props.block }
  ]
})

const onClick = (event: MouseEvent): void => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <a
    :href="props.disabled ? '' : props.href"
    :class="buttonStyle"
    @click.prevent="onClick">
    <div class="btn-wrap">
      <template v-if="!onlyIcon">
        <template v-if="props.loading">
          <i class="loading material-icons">
            workspaces_filled
          </i>
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
  </a>
</template>

<style lang="scss">
@import './style.scss';
</style>