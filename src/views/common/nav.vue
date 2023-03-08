<script setup lang="ts">
/**
 * 사이드 메뉴는 기본 상태와 최소화 상태로 구분 하고,
 * 상단 툴바의 메뉴 아이콘을 클릭 시 최소화 상태로 바뀐다.
 * 최소화 상태일때 메뉴 아이콘을 클릭하면 플로팅 상태로 메뉴가 기본 상태로 변경되고
 * 이동할 메뉴를 클릭 하거나, 사이드 메뉴 밖을 클릭할 경우 원래 최소화 상태로 돌아간다.
 */
import { ref, watch, inject, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import json from '@/data/menu.json'
import type { VueCookies } from 'vue-cookies'

const { dispatch, getters } = useStore()
const router: Router = useRouter()
const route: RouteLocationNormalizedLoaded = useRoute()
const cookies = inject('$cookies') as VueCookies

const emit = defineEmits<{
  (event: 'toggle', value: boolean): void
}>()

// 사이드 메뉴 최소화 상태
let isNavTiny = ref<boolean>(false)
let releaseTiny = ref<boolean>(false)
const menus = ref<any>(json)
const nav = ref<HTMLDivElement | null>(null)

let activeMenu: number[] = [-1, -1]

// 사이드 메뉴의 아이콘을 클릭할 경우 최소화 상태가 기본 상태로 변경 되지 않는 현상을 방지하기 위해
// 메뉴 아이콘을 따로 배열로 저장하여 구분 가능하도록 한다.
const icons = json.map(item => item.icon)

watch(isNavTiny, (v) => {
  emit('toggle', v)
})

// 라우트 변경 상태를 감지하여 로그인 여부 체크
watch(route, () => {
  if (!getters.getLoginState) {
    logout()
  }
})

/**
 * 왼쪽 네비게이션 메뉴 축소, 원복
 */
const toggleNav = (): void => {
  isNavTiny.value = !isNavTiny.value

  if (isNavTiny.value) {
    cookies.set('navTiny', 'Y', '1M')
  } else {
    cookies.remove('navTiny')
  }
}

/**
 * 서브 메뉴 활성화 비활성화 처리
 *
 * @param index
 */
const toggleMenu = (index: number): void => {
  if (isNavTiny.value) {
    releaseTiny.value = true
  }

  if (!isNavTiny.value || releaseTiny.value) {
    if (!(releaseTiny.value && menus.value[index].active)) {
      menus.value[index].active = !menus.value[index].active
    }
  }
}

/**
 * 최소화 상태의 메뉴로 돌려 준다.
 */
const menuAction = (main: number, sub: number): void => {
  const [mi, si] = activeMenu

  // 기존 활성 메뉴 초기화
  if (main !== mi) {
    mainMenuClose(main)
  }

  if (si > -1) {
    menus.value[mi].child[si].active = false
  }

  activeMenu = [main, sub]
  menus.value[main].child[sub].active = true
  releaseTiny.value = false
}

const mainMenuClose = (main: number): void => {
  menus.value.forEach((item: any, i: number) => {
    if (i !== main) {
      item.active = false
    }
  })
}

/**
 * 로그인 쿠키를 비워 주고 store session 데이터 제거
 */
const logout = (): void => {
  router.push('/')

  cookies.remove('id')
  cookies.remove('idx')
  cookies.remove('name')
  cookies.remove('lev')

  dispatch('setClearSession')
}

const init = (): void => {
  const [, mainPath, subPath] = location.pathname.split('/')

  menus.value.forEach((main: any, i: number) => {
    if (main.path === mainPath) {
      main.active = true
      activeMenu[0] = i

      if (main.child.length) {
        main.child.forEach((sub: any, j: number) => {
          if (sub.path === subPath) {
            sub.active = true
            activeMenu[1] = j
          }
        })
      }
    }
  })
}

//============================================================
//  life cycle
//============================================================
onMounted(() => {
  init()

  const navStatus: string | null = cookies.get('navTiny')

  isNavTiny.value = (navStatus === 'Y') ? true : false

  document.addEventListener('click', (evt: Event) => {
    const nav = document.querySelector('nav') as HTMLElement
    const target = evt.target as HTMLElement

    // 사이드 메뉴 밖을 클릭 할 경우 다시 최소화 상태로 변경
    if (!nav.contains(target) && !icons.includes(target.className)) {
      releaseTiny.value = false

      mainMenuClose(activeMenu[0])
    }
  })
})
</script>

<template>
  <div id="TopToolBar">
    <div class="left-side flex-center">
      <a href="#" @click.prevent="toggleNav">
        <i class="fas fa-bars"></i>
      </a>
      <h3>AD-Maker 통합관리자</h3>
    </div>
    <div class="right-side flex-center">
      <a href="#" @click.prevent>
        <i class="fas fa-user"></i>
        <span>관리자</span>
      </a>
      <a href="#" @click.prevent="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>로그아웃</span>
      </a>
    </div>
  </div>

  <nav ref="nav" :class="{ tiny: isNavTiny && !releaseTiny }">
    <ul>
      <li
        :class="{ active: main.active }"
        v-for="(main, i) in menus">
        <a
          href="#"
          :class="['menu-wrap']"
          @click.prevent="toggleMenu(i)">
          <template v-if="!isNavTiny || releaseTiny">
            <div class="menu-left">
              <div class="menu-icon">
                <i :class="main.icon"></i>
              </div>
              {{ main.name }}
            </div>
            <div class="menu-right">
              <i :class="['fas fa-chevron-down', { active: main.active }]"></i>
            </div>
          </template>
          <template v-else>
            <i :class="main.icon"></i>
          </template>
        </a>

        <template v-if="!isNavTiny || releaseTiny">
          <ul :style="{ height: !main.active ? 0 : `${main.child.length * 45}px` }">
            <li
              :class="['sub', { active: sub.active }]"
              v-for="(sub, j) in main.child">
              <RouterLink
                :to="`/${main.path}/${sub.path}`"
                @click="menuAction(i, j)">
                {{ sub.name }}
              </RouterLink>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </nav>
</template>
