<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

let uuid = ref<number>(0)

let isShow = ref<boolean>(true)

watch(route, () => {
  checkRoute()
})

const checkRoute = (): void => {
  if (!route.params.uuid) {
    isShow.value = false
  } else {
    isShow.value = true
  }
}

const routerBack = (): void => {
  router.go(-1)
}
</script>

<template>
  <Modal title="상세 내용" @dispose="routerBack" v-model="isShow">
    <template #body>
      <div class="wrap">
        1111
        uuid: {{ uuid }}
      </div>
    </template>
  </Modal>
</template>