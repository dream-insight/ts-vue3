<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let text = ref<string>('home')

const movePage = (uuid: number = 0): void => {
  router.push({name: 'listDetail', params: { uuid } })
}
</script>

<template>
  <div class="wrap">
    <span>{{ text }}</span>
    <p>
      <Button color="primary" @click="movePage()">목록 보기</Button>
    </p>
    <p>
      <Button color="info" @click="movePage(212313)">상세 보기 보기</Button>
    </p>
  </div>
</template>