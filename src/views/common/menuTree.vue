<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import menus from '@/data/menu.json'

const route: RouteLocationNormalizedLoaded = useRoute()
let menuPath = ref<string[]>([])

const getPathName = (menu: any, path: string[], index: number = 0): void => {
  const len: number = menu.length
  const str: string = path[index]

  for (let i: number = 0; i < len; i++) {
    if (menu[i].path === str) {
      menuPath.value.push(menu[i].name)

      if (menu[i].child) {
        getPathName(menu[i].child, path, index + 1)
      }

      break
    }
  }
}

watch (() => route.name, (a) => {
  menuPath.value = []
  getPathName(menus, String(a).split('/'))
})

const lastMenuName = computed(() => menuPath.value[menuPath.value.length - 1])
</script>

<template>
  <div id="menuTree">
    <i class="fas fa-home"></i>
    Home
    <template v-for="item in menuPath">
      <i class="fas fa-chevron-right mx-1"></i>
      {{ item }}
    </template>
  </div>

  <h3>
    <i class="far fa-circle-right"></i>
    {{ lastMenuName }}
    </h3>
</template>