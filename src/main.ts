import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import Toast from '@/components/Toast'

import CheckButton from '@/components/Form/CheckButton/index.vue'
import DatePicker from '@/components/Form/DatePicker/index.vue'
import NumberFormat from '@/components/Form/NumberFormat/index.vue'
import SelectBox from '@/components/Form/SelectBox/index.vue'
import SwitchButton from '@/components/Form/SwitchButton/index.vue'
import TextField from '@/components/Form/TextField/index.vue'
import ValidateForm from '@/components/Form/ValidateForm/index.vue'
import ValidateWrap from '@/components/Form/ValidateWrap/index.vue'
import ListTable from '@/components/ListTable/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Tooltip from '@/components/Tooltip/index.vue'
import Tabs from '@/components/Tabs/index.vue'

// prototype
import '@/js/prototype'

import '@/assets/style/index.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(VueCookies)
  .use(Modal)
  .use(Spinner)
  .use(Toast)
  .component('CheckButton', CheckButton)
  .component('DatePicker', DatePicker)
  .component('NumberFormat', NumberFormat)
  .component('SelectBox', SelectBox)
  .component('SwitchButton', SwitchButton)
  .component('TextField', TextField)
  .component('ValidateWrap', ValidateWrap)
  .component('ValidateForm', ValidateForm)
  .component('ListTable', ListTable)
  .component('Pagination', Pagination)
  .component('Tooltip', Tooltip)
  .component('Tabs', Tabs)
  .mount('#app')
