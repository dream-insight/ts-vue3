<script setup lang="ts">
import { ref, inject } from 'vue'
import type { SelectBoxItem } from '@/components/Form/SelectBox/types'
import type { Modal, ModalOptions } from '@/components/Modal/types'
import type { Toast, MessageOptions } from '@/components/Toast/types'
import type { Spinner } from '@/components/Spinner/index'
import FormType from '@/components/Form/ValidateForm/index.vue'

const Modal = inject('Modal') as Modal
const Toast = inject('Toast') as Toast
const Spinner = inject('Spinner') as Spinner

const form = ref<InstanceType<typeof FormType> | null>(null)

let textField = ref<string>('')

let selectBox = ref<string>('2')
let selectBoxIndex = ref<number>(-1)

const selectBoxItems = ref<SelectBoxItem[]>([
  { text: 'text1', value: '1' },
  { text: 'text2', value: '2' },
  { text: 'text3', value: '3' },
  { text: 'text4', value: '4' },
])

let checkButton = ref<any[]>(['1', '3'])
let checkButtonIndex = ref<number>(-1)

let numberFormat = ref<number>(334000)

let page = ref<number>(1)
let total = ref<number>(2123)

let date = ref<string[]>(['', ''])

const rules = [
  (v: any): string | boolean => !!v || '이럴수가!'
]

const check = (): void => {
  form.value?.validate()
}

const alertModal = (): void => {
  Modal.alert('test')
}

const confirmModal = (): void => {
  Modal.confirm({
    message: 'test2222',
    okay: (): void => {
      console.log('test')
    }
  } as ModalOptions)
}

const showToast = (color: string): void => {
  if (color === 'success') {
    Toast('메시지 보여야되!')
  } else {
    const options: MessageOptions = {
      color,
      message: `${color} color toast message`
    }

    Toast(options)
  }
}

const showSpinner = (): void => {
  Spinner.show()
}
</script>

<template>
  <ValidateForm ref="form">
    <p><DatePicker range v-model="date" /></p>
    <p>{{ date }}</p>
    <p><TextField :validate="rules" v-model="textField" /></p>
    <p>textField: {{ textField }}</p>
    <p><NumberFormat :validate="rules" v-model="numberFormat" /></p>
    <p>numberFormat: {{ numberFormat }}</p>
    <p>
      <SelectBox
        :options="selectBoxItems"
        v-model="selectBox"
        v-model:selectedIndex="selectBoxIndex"
      />
    </p>
    <p>
      selectBox : {{ selectBox }}, index: {{ selectBoxIndex }}
    </p>
    <p>
      <CheckButton
        button
        name="item"
        :items="selectBoxItems"
        v-model="checkButton"
        v-model:clickIndex="checkButtonIndex"
      />
    </p>
    <p>
      checkButton : {{ checkButton }}, index: {{ checkButtonIndex }}
    </p>
    <div>
      <Pagination :total="total" v-model="page" />
    </div>
    <p>Pagination: {{ page }}</p>
  </ValidateForm>

  <p><button type="button" @click="check">폼 검사하기</button></p>

  <p>
    <button type="button" @click="alertModal">Alert 보기</button>
    &nbsp;&nbsp;&nbsp;
    <button type="button" @click="confirmModal">Confirm 보기</button>
  </p>
  <p>
    <button type="button" @click="showToast('success')">success toast</button>
    &nbsp;&nbsp;&nbsp;
    <button type="button" @click="showToast('info')">info toast</button>
    &nbsp;&nbsp;&nbsp;
    <button type="button" @click="showToast('warning')">warning toast</button>
    &nbsp;&nbsp;&nbsp;
    <button type="button" @click="showToast('error')">error toast</button>
  </p>
  <p>
    <button type="button" @click="showSpinner">spinner</button>
  </p>
  <p>
    <Tooltip right message="이렇게 보인다구" />
  </p>
</template>