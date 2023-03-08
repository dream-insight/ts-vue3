<script setup lang="ts">
import { ref } from 'vue'
import Navigation from './views/common/nav.vue'
import MenuTree from './views/common/menuTree.vue'

// 메뉴 상태 처리
let isTiny = ref<boolean>(false)

const menuToggle = (bln: boolean): void => {
  isTiny.value = bln
}
</script>

<template>
  <Navigation @toggle="menuToggle" />

  <div id="container" :class="{ tiny: isTiny }">
    <div id="wrap">
      <MenuTree />

      <RouterView v-slot="{ Component }">
        <Transition appear name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>