import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Forms from '@/views/forms.vue'
import ItemList from '@/views/list.vue'
import ItemDetail from '@/views/detail.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/list',
    name: 'list',
    component: ItemList,
    children: [
      {
        path: ':uuid',
        name: 'listDetail',
        component: ItemDetail
      }
    ],
  },
  { path: '/forms', name: 'forms', component: Forms },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
