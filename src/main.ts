import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import TextField from '@/components/Form/TextField/index.vue'
import SelectBox from '@/components/Form/SelectBox/index.vue'
import NumberFormat from '@/components/Form/NumberFormat/index.vue'
import CheckButton from '@/components/Form/CheckButton/index.vue'
import SwitchButton from '@/components/Form/SwitchButton/index.vue'
import DatePicker from '@/components/Form/DatePicker/index.vue'
import ValidateWrap from '@/components/Form/ValidateWrap/index.vue'
import ValidateForm from '@/components/Form/ValidateForm/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Tooltip from '@/components/Tooltip/index.vue'
import ListTable from '@/components/ListTable/index.vue'

import Modal from '@/components/Modal/index'
import Toast from '@/components/Toast/index'
import Spinner from '@/components/Spinner/index'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faExclamationTriangle, faInfoCircle, faBan, faCheckCircle,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight,
  faQuestionCircle, faExclamationCircle, faArrowDown, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheckCircle, faInfoCircle, faExclamationTriangle, faBan,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight,
  faQuestionCircle, faExclamationCircle, faArrowDown, faCalendarAlt
)

createApp(App)
  .use(router)
  .component('TextField', TextField)
  .component('NumberFormat', NumberFormat)
  .component('SelectBox', SelectBox)
  .component('CheckButton', CheckButton)
  .component('SwitchButton', SwitchButton)
  .component('DatePicker', DatePicker)
  .component('ValidateWrap', ValidateWrap)
  .component('ValidateForm', ValidateForm)
  .component('Pagination', Pagination)
  .component('Tooltip', Tooltip)
  .component('ListTable', ListTable)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(Modal)
  .use(Toast)
  .use(Spinner)
  .mount('#app')