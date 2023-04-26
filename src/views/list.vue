<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ItemDetail from './detail.vue'

const router = useRouter()
const route = useRoute()

let isShow = ref<boolean>(false)

watch(route, () => {
  checkRoute()
})

const detail = (): void => {
  router.push('/list/22523512')
}

const goHome = (): void => {
  router.push({name: 'home'})
}

const checkRoute = (): void => {
  const { uuid } = route.params

  if (uuid) {
    isShow.value = true
  }
}

checkRoute()
</script>

<template>
  <div class="wrap">
    <span>목록 화면 입니다.</span>
    <p><Button color="success" @click="detail">상세보기</Button></p>
    <p><Button color="warning" @click="goHome">Home으로</Button></p>
  </div>

  <RouterView />
</template>