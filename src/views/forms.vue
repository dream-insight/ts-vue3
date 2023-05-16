<script setup lang="ts">
import { ref, reactive, inject, isReactive } from 'vue'
import type { Rules, OptionItem } from '@/components/Form/types'
import type { MessageBox, MessageBoxOptions } from '@/components/MessageBox/types'
import type { ToastColorCase, Toast } from '@/components/Toast/types'
import type { Spinner } from '@/components/Spinner/types'
import type { ValidateForm } from '@/components/Form/ValidateForm/types'
import type { DropMenuItem  } from '@/components/DropMenu/types'
import { dropMenuTransition, dropMenuPosition } from '@/components/DropMenu/types'
import { ListTableHeader, ListTableItem } from '@/components/ListTable/types'
import axios from 'axios'

const MessageBox = inject('MessageBox') as MessageBox
const Toast = inject('Toast') as Toast
const Spinner = inject('Spinner') as Spinner

let text = ref<string>('')
let textarea = ref<string>('')
let multiinput1 = ref<string>('')
let multiinput2 = ref<string>('')
let multiinput3 = ref<boolean>(false)
let num = ref<number>(0)
let select = ref<string>('')
let selectMulti = ref<any[]>([])
let date1 = ref<string>('')
let date2 = ref<string>('')
let rangeDate = ref<string[]>(['', ''])
let checked = ref<string[]>([])
let radio = ref<string>('')
let checked2 = ref<string[]>(['1', '3', '5'])
let radio2 = ref<string>('3')
let btnChecked = ref<string[]>([])
let btnChecked2 = ref<string[]>(['1', '3', '4'])
let switchYN = ref<string>('N')
let switchBool = ref<boolean>(false)

const buttonColors: string[] = ['primary', 'success', 'info', 'warning', 'danger', 'dark', 'secondary'];

const opt: OptionItem[] = [
  { text: '딸기', value: '1' },
  { text: '바나나', value: '2' },
  { text: '옥수수', value: '3' },
  { text: '커피콩', value: '4' },
  { text: '두리안', value: '5' },
  { text: '체리', value: '6' },
  { text: '고구마', value: '7' },
  { text: '감자', value: '8' },
  { text: '블루베리', value: '9' },
  { text: '아몬드', value: '10' },
  { text: '샤인머스켓', value: '11' },
  { text: '수박', value: '12' },
  { text: '참외', value: '13' },
  { text: '멜론', value: '14' },
  { text: '땅콩', value: '15' },
]
const items: OptionItem[] = [
  { text: '원신', value: '1' },
  { text: '바이오하자드', value: '2' },
  { text: '갓 오브 워', value: '3' },
  { text: '스파이더맨', value: '4' },
  { text: '호라이즌: 포비든 웨스트', value: '5' },
  { text: '래드 데드 리댐션', value: '6' },
]
const rule: Rules = {
  input: [v => !!v || '입력해야지!!!'],
  number: [v => !(Number(v) === 0) || '0이외의 값을 입력!!!'],
  select: [v => !!v || '선택하라고!'],
  selectMulti: [v => !(v.length < 2) || '2개 이상 선택!'],
  check: [v => !(v.length === 0) || '체크해라!']
}

const dropMenuItem: DropMenuItem[] = [
  {
    text: '원신',
    icon: 'circle-slice-3',
    action: () => {
      console.log('메뉴 1 click')
    }
  },
  {
    text: '바이오하자드',
    icon: 'medication',
    action: () => {
      console.log('메뉴 2 click')
    }
  },
  {
    text: '갓 오브 워',
    icon: 'account-alert',
    action: () => {
      console.log('메뉴 3 click')
    }
  },
  {
    text: '스파이더맨',
    icon: 'spider',
    action: () => {
      console.log('메뉴 4 click')
    }
  },
  {
    text: '호라이즌: 포비든 웨스트',
    icon: 'horizontal-rotate-clockwise',
    action: () => {
      console.log('메뉴 5 click')
    }
  },
  {
    text: '레대 데드 리댐션',
    icon: 'coffin',
    action: () => {
      console.log('메뉴 6 click')
    }
  },
]

const MessageBoxAlert = (flag?: string): void => {
  if (flag === 'confirm') {
    MessageBox.confirm({
      title: '재밌는데?',
      message: '드디어 간다!',
      okay: () => {
        Toast('oh Yes!!!')
      }
    })
  } else {
    MessageBox.alert({
      message: '갈까나~!?',
      okay: () => {
        Toast('alert boom!!!')
      }
    })

    // MessageBox.alert('알림!')
  }
}

const withButtonClick = (): void => {
  MessageBox.alert('버튼과 함께 있는 TextField')
}

const showToast = (color?: ToastColorCase): void => {
  if (color === 'success') {
    Toast('이런 메시지가 보인다!')
  } else {
    Toast({
      color,
      message: '보인다고~~~'
    })
  }
}

const showSpinner = (delay: number = 0, timeout = 3): void => {
  Spinner.timeout(timeout).delay(delay).show()
}

const form1 = ref<ValidateForm>()
const form2 = ref<ValidateForm>()
const form3 = ref<ValidateForm>()
const form4 = ref<ValidateForm>()
const form5 = ref<ValidateForm>()
const form6 = ref<ValidateForm>()

const checkForm = (index: number = 0): void => {
  switch (index) {
    case 1: form2.value?.validate(); break
    case 2: form3.value?.validate(); break
    case 3: form4.value?.validate(); break
    case 4: form5.value?.validate(); break
    case 5: form6.value?.validate(); break
    default: form1.value?.validate()
  }
}

let isLoading = ref<boolean>(false)

const showLoading = (): void => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 5000)
}

let isShow = reactive<{
  [index: string]: boolean
}>({
  popup: false,
  right: false,
  left: false,
  bottom: false,
  cover: false,
  in: false,
})

const showModal = (flag: string): void => {
  isShow[flag] = true
}

// ListTable
const tableHeader: ListTableHeader[] = [
  { text: 'idx', width: '100', sort: true, target: 'db_idx' },
  { text: '이름', width: '150', sort: true, target: 'mb_name' },
  { text: '미디어', width: '300', sort: true, target: 'mda_name' },
  { text: '접속정보', width: '700', sort: true, target: 'referer' },
  { text: 'IP', width: '300', sort: true, target: 'ip' },
  { text: '등록일', width: '300', sort: true, target: 'reg_date' },
  { text: '처리', width: '300' },
]

const list = ref<ListTableItem[]>([])
const checkList = ref<string[]>([])
const checkAll = (checked: boolean): void => {
  if (checked) {
    checkList.value = list.value.map((item: ListTableItem) => item.db_idx)
  } else {
    checkList.value = []
  }
}

let page: number = 1
const page_size: number = 50
let dataLoading = ref<boolean>(false)

const getFormData = (): FormData => {
  const formData = new FormData()

  formData.append('page', page.toString())
  formData.append('page_size', page_size.toString())

  return formData
}

const getData = async (): Promise<void> => {
  dataLoading.value = true
  const reuslt = await axios.post('https://dev.admakernews.com/counsel/get_counsel_list', getFormData())

  if (reuslt.data.data.length) {
    page++
    console.log('loading')

    reuslt.data.data.forEach((item: ListTableItem) => {
      list.value.push(item)
    })

    dataLoading.value = false
  }
}

const modal = reactive({
  text1: '',
  text2: '',
  text3: '',
  radio: '0',
})

getData()
</script>

<template>
  <div class="wrap">
    <ValidateForm ref="form1">
      <div class="card mt-3">
        <div class="card-header h3">
          TextField
        </div>
        <div  class="card-body">
          <div class="row">
            <div class="col">
              <TextField
                block
                label="기본 입력"
                placeholder="이곳에 텍스트를 입력해주세요."
                v-model="text"
              />
            </div>
            <div class="col">
              <TextField
                block
                required
                :max-length="30"
                label="유효성 검사 및 필수 입력"
                placeholder="이곳에 텍스트를 입력해주세요."
                :validate="rule.input"
                v-model="text"
              />
            </div>
            <div class="col">
              <TextField
                block
                required
                type="password"
                :max-length="30"
                label="비밀번호 타입"
                placeholder="이곳에 텍스트를 입력해주세요."
                :validate="rule.input"
                v-model="text"
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <TextField
                block
                required
                is-counting
                :max-length="30"
                label="입력 텍스트 카운팅"
                placeholder="이곳에 텍스트를 입력해주세요."
                :validate="rule.input"
                v-model="text"
              />
            </div>
            <div class="col">
              <TextField
                block
                disabled
                label="사용 불가"
                placeholder="데이터 입력 불가 (validate 적용 안됨)"
                :validate="rule.input"
                v-model="text"
              />
            </div>
            <div class="col">
              <TextField
                block
                required
                hide-message
                label="버튼과 함께"
                placeholder="하단에 메시지가 표시 되지 않습니다."
                :validate="rule.input"
                v-model="text">
                <Button color="primary" @click="withButtonClick">with Button</Button>
              </TextField>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <TextField
                block
                icon-left
                icon="mdi-pencil-box-multiple"
                label="왼쪽에 아이콘 표시"
                placeholder="왼쪽에 아이콘이 표시 됩니다."
                :validate="rule.input"
                v-model="text"
              />
            </div>
            <div class="col">
              <TextField
                block
                disabled
                icon="mdi-magnify"
                label="오른쪽 아이콘 표시"
                placeholder="오른쪽에 아이콘이 표시 됩니다."
                :validate="rule.input"
                v-model="text">
              </TextField>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <TextField
                block
                multiline
                is-counting
                label="멀티 라인 입력"
                placeholder="여러줄 입력 가능합니다."
                :max-length="10"
                :rows="10"
                v-model="textarea"
              />
            </div>
          </div>

          <div class="row">
            <div class="col mt-3 text-center">
              <Button block tag="button" color="primary" @click.prevent="checkForm()">폼 체크하기</Button>
            </div>
          </div>
        </div>
      </div>
    </ValidateForm>

    <ValidateForm ref="form2">
      <div class="card mt-3">
        <div class="card-header h3">
          NumberFormat
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <NumberFormat
                block
                required
                label="금액"
                placeholder="숫자만 입력해주세요."
                :validate="rule.input"
                v-model="num"
              />
            </div>
            <div class="col">
              <NumberFormat
                block
                disabled
                label="금액"
                placeholder="숫자만 입력해주세요."
                :validate="rule.input"
                v-model="num"
              />
            </div>
            <div class="col">
              <NumberFormat
                block
                required
                hide-message
                label="하단 메시지 표시 안함"
                placeholder="숫자만 입력해주세요."
                :validate="rule.input"
                v-model="num"
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3 text-center">
              <Button block color="primary" @click.prevent="checkForm(1)">폼 체크하기</Button>
            </div>
          </div>
        </div>
      </div>
    </ValidateForm>

    <ValidateForm ref="form3">
      <div class="card mt-3">
        <div class="card-header h3">
          SelectBox
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <SelectBox
                block
                required
                label="기본 형태"
                placeholder="스타일을 선택해주세요."
                :validate="rule.select"
                :options="opt"
                v-model="select"
              />
            </div>
            <div class="col">
              <SelectBox
                block
                required
                multiple
                is-short
                label="다중 선택"
                placeholder="스타일을 선택해주세요."
                :validate="rule.selectMulti"
                :options="opt"
                v-model="selectMulti"
              />
            </div>
            <div class="col">
              <SelectBox
                block
                required
                searchable
                hide-message
                label="옵션 검색 기능"
                placeholder="스타일을 선택해주세요."
                :validate="rule.select"
                :options="opt"
                v-model="select"
              />
            </div>
            <div class="col">
              <SelectBox
                block
                multiple
                label-text
                is-short
                btn-accept
                label="적용 버튼 추가(다중 선택에서만 가능)"
                placeholder="선택 후 적용 버튼을 클릭 하지 않으면 초기화 됩니다."
                :options="opt"
                v-model="selectMulti"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <SelectBox
                block
                searchable
                multiple
                hide-message
                label="옵션 검색 기능"
                placeholder="스타일을 선택해주세요."
                :options="opt"
                v-model="selectMulti"
              />
            </div>
            <div class="col">
              <SelectBox
                block
                multiple
                label-text
                btn-accept
                label="적용 버튼 추가(다중 선택에서만 가능)"
                placeholder="선택 후 적용 버튼을 클릭 하지 않으면 초기화 됩니다."
                :options="opt"
                v-model="selectMulti"
              />
            </div>
            <div class="col">
              <SelectBox
                block
                disabled
                in-label
                label="사용불가 처리"
                placeholder="이 컴포넌트는 disabled 상태입니다."
                :options="opt"
                v-model="selectMulti"
              />
            </div>
            <div class="col">
              <SelectBox
                block
                multiple
                in-label
                label="안쪽에 라벨 표시"
                placeholder="inline label 표시"
                :options="opt"
                v-model="selectMulti"
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3 text-center">
              <Button block color="primary" @click.prevent="checkForm(2)">폼 체크하기</Button>
            </div>
          </div>
        </div>
      </div>
    </ValidateForm>

    <ValidateForm ref="form4">
      <div class="card mt-3">
        <div class="card-header h3">
          DatePicker
        </div>
        <div class="card-body">
          <div class="row mt-3">
            <div class="col">
              <DatePicker
                block
                required
                separator="/"
                label="생일(날짜 구분 /)"
                placeholder="날짜 선택"
                :validate="rule.input"
                v-model="date1"
              />
            </div>
            <div class="col">
              <DatePicker
                block
                hide-message
                separator="."
                label="생일(날짜 구분 .)"
                placeholder="날짜 선택"
                :validate="rule.input"
                v-model="date2"
              />
            </div>
            <div class="col">
              <DatePicker
                block
                readonly
                separator="."
                label="읽기 전용"
                placeholder="날짜 선택"
                :validate="rule.input"
                v-model="date2"
              />
            </div>
            <div class="col">
              <DatePicker
                disabled
                block
                range
                label="사용 불가"
                :placeholder="['시작일 선택', '종료일 선택']"
                :max-range="30"
                :validate="rule.input"
                v-model="rangeDate"
              />
            </div>
            <div class="col">
              <DatePicker
                block
                range
                label="서비스 기간 (날짜 구분 기본)"
                :placeholder="['시작일 선택', '종료일 선택']"
                :max-range="30"
                :validate="rule.input"
                v-model="rangeDate"
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3 text-center">
              <Button block color="primary" @click.prevent="checkForm(3)">폼 체크하기</Button>
            </div>
          </div>
        </div>
      </div>
    </ValidateForm>

    <ValidateForm ref="form5">
      <div class="card mt-3">
        <div class="card-header h3">
          CheckButton
        </div>
        <div class="card-body">
          <div class="row mt-4">
            <div class="col">
              <CheckButton
                block
                name="checkbutton"
                :max-length="3"
                :validate="rule.check"
                :items="items"
                v-model="checked"
              />
            </div>
            <div class="col">
              <CheckButton
                block
                type="radio"
                color="success"
                name="checkbutton2"
                :validate="rule.select"
                :items="items"
                v-model="radio"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <CheckButton
                disabled
                name="checkbutton3"
                color="info"
                :max-length="3"
                :validate="rule.check"
                :items="items"
                v-model="checked2"
              />
            </div>
            <div class="col">
              <CheckButton
                disabled
                type="radio"
                color="secondary"
                name="checkbutton4"
                :validate="rule.select"
                :items="items"
                v-model="radio2"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <CheckButton
                button
                color="warning"
                name="checkbutton5"
                :validate="rule.check"
                :items="items"
                v-model="btnChecked"
              />
            </div>
            <div class="col">
              <CheckButton
                button
                disabled
                color="danger"
                name="checkbutton6"
                :validate="rule.check"
                :items="items"
                v-model="btnChecked2"
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3 text-center">
              <Button block color="primary" @click.prevent="checkForm(4)">폼 체크하기</Button>
            </div>
          </div>
        </div>
      </div>
    </ValidateForm>

    <ValidateForm ref="form6">
      <div class="card mt-3">
        <div class="card-header h3">
          SwitchButton
        </div>
        <div class="card-body">
          <div class="row mt-2">
            <div class="col">
              <SwitchButton
                true-value="Y"
                false-value="N"
                validate="설정해야 합니다!"
                v-model="switchYN"
              />
            </div>
            <div class="col">
              <SwitchButton
                small
                readonly
                color="success"
                :label="['꺼짐', '켜짐']"
                v-model="switchBool"
              />
            </div>
            <div class="col">
              <SwitchButton
                checkbox
                color="danger"
                placeholder="체크박스 형태 스위치 버튼"
                v-model="switchBool"
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3 text-center">
              <Button block color="primary" @click.prevent="checkForm(5)">폼 체크하기</Button>
            </div>
          </div>
        </div>
      </div>
    </ValidateForm>

    <div class="card mt-3">
      <div class="card-header h3">
        Buttons
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col" v-for="color in buttonColors">
            <Button block :color="color">color: {{ color }}</Button>
          </div>
          <div class="col">
            <Button block outline>outline</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col" v-for="color in buttonColors">
            <Button block disabled :color="color">color: {{ color }}</Button>
          </div>
          <div class="col">
            <Button block disabled outline>outline</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col" v-for="color in buttonColors">
            <Button small :color="color">color: {{ color }}</Button>
          </div>
          <div class="col">
            <Button small outline>outline</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col" v-for="(color, index) in buttonColors">
            <Button text :icon-right="index % 2 !== 0" icon="mdi-pencil" :color="color">color: {{ color }}</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <Button block color="primary" icon="mdi-download">with icon (left)</Button>
          </div>
          <div class="col">
            <Button block icon-right color="success" icon="mdi-upload">with icon (right)</Button>
          </div>
          <div class="col">
            <Button block :disabled="isLoading" :loading="isLoading" color="warning" @click="showLoading">클릭하면 5초간 스피너가 보이고 disabled 됩니다.</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col flex justify-around">
            <Button only-icon color="primary" icon="mdi-upload"></Button>
            <Button only-icon color="success" icon="mdi-reply"></Button>
            <Button only-icon color="info" icon="mdi-power"></Button>
            <Button only-icon color="warning" icon="mdi-restart"></Button>
            <Button only-icon color="danger" icon="mdi-open-in-new"></Button>
            <Button only-icon color="dark" icon="mdi-export-variant"></Button>
            <Button only-icon color="secondary" icon="mdi-content-save"></Button>
            <Button only-icon outline color="secondary" icon="mdi-content-save"></Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col flex justify-around">
            <Button only-icon small color="primary" icon="mdi-upload"></Button>
            <Button only-icon small color="success" icon="mdi-reply"></Button>
            <Button only-icon small color="info" icon="mdi-power"></Button>
            <Button only-icon small color="warning" icon="mdi-restart"></Button>
            <Button only-icon small color="danger" icon="mdi-open-in-new"></Button>
            <Button only-icon small color="dark" icon="mdi-export-variant"></Button>
            <Button only-icon small color="secondary" icon="mdi-content-save"></Button>
            <Button only-icon small outline color="secondary" icon="mdi-content-save"></Button>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header h3">
        Drop Menu
      </div>
      <div class="card-body">
        <div class="row mt-2">
          <div class="col">
            <DropMenu
              color="primary"
              :width="300"
              :items="dropMenuItem"
              #default="{ toggle }">
              <Button
                icon-right
                icon="mdi-chevron-down"
                color="primary"
                :drop-menu-toggle="toggle">
                드롭 메뉴(slide) 보기
              </Button>
            </DropMenu>
          </div>
          <div class="col">
            <DropMenu
              color="success"
              :position="dropMenuPosition.left"
              :transition="dropMenuTransition.scale"
              :items="dropMenuItem"
              #default="{ toggle }">
              <Button
                icon="mdi-chevron-down"
                color="info"
                :drop-menu-toggle="toggle">
                메뉴 왼쪽(scale) 보기
              </Button>
            </DropMenu>
          </div>
          <div class="col">
            <DropMenu
              color="info"
              :position="dropMenuPosition.right"
              :transition="dropMenuTransition.fade"
              :items="dropMenuItem"
              #default="{ toggle }">
              <Button
                icon-right
                icon="mdi-chevron-down"
                color="success"
                :drop-menu-toggle="toggle">
                메뉴 오른쪽(fade) 보기
              </Button>
            </DropMenu>
          </div>
          <div class="col">
            <DropMenu
              color="secondary"
              :position="dropMenuPosition.top"
              :items="dropMenuItem"
              #default="{ toggle }">
              <Button
                icon-right
                icon="mdi-chevron-up"
                color="secondary"
                :drop-menu-toggle="toggle">
                메뉴 위쪽 보기
              </Button>
            </DropMenu>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header h3">
        Message
      </div>
      <div class="card-body">
        <div class="row mt-2">
          <div class="col">
            <Button block color="dark" @click.prevent="MessageBoxAlert()">알림창 보기</Button>
          </div>
          <div class="col">
            <Button block color="secondary" @click.prevent="MessageBoxAlert('confirm')">승인창 보기</Button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <Button block color="success" @click.prevent="showToast('success')">토스트 메시지 보기</Button>
          </div>
          <div class="col">
            <Button block color="info" @click.prevent="showToast('info')">토스트 메시지 보기</Button>
          </div>
          <div class="col">
            <Button block color="warning" @click.prevent="showToast('warning')">토스트 메시지 보기</Button>
          </div>
          <div class="col">
            <Button block color="danger" @click.prevent="showToast('danger')">토스트 메시지 보기</Button>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header h3">
        Tooltip
      </div>
      <div class="card-body">
        <div class="row mt-2">
          <div class="col text-center">
            <Tooltip right hovering message="이건 툴팁입니다.">
              <span class="material-icons" style="font-size: 30px">warning</span>
              마우스를 올리면 툴팁이 보입니다.
            </Tooltip>
          </div>
          <div class="col">
            <div class="row justify-center">
              오른쪽 아이콘을 클릭 해주세요.
              <Tooltip
                bottom
                btn-close
                icon-size="24px"
                title="제목이거든요"
                :message="['이건 툴팁입니다.', '툴팁의 방향을 조절해주세요.']"
              />
            </div>
          </div>
          <div class="col text-center">
            <Tooltip
              left
              hovering
              icon="info"
              icon-size="24px"
              title="왼쪽에서 나옵니다."
              :message="['이건 툴팁입니다.', '툴팁의 방향을 조절해주세요.']"
            />
          </div>
          <div class="col text-center">
            <Tooltip
              top
              icon-size="24px"
              title="위에서 보여집니다."
              icon="arrow_circle_up"
              :message="['이건 툴팁입니다.', '툴팁의 방향을 조절해주세요.']"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header h3">
        Spinner
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col mt-3 text-center">
            <Button block color="secondary" @click="showSpinner()">스피너 보기</Button>
          </div>
          <div class="col mt-3 text-center">
            <Button block color="dark" @click="showSpinner(3, 5)">스피너 3초후 5초간 보기</Button>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header h3">
        Modal
      </div>
      <div  class="card-body">
        <div class="row">
          <div class="col">
            <Button block color="primary" icon="mdi-open-in-new" @click="showModal('popup')">
              모달 팝업 보기
            </Button>
          </div>
          <div class="col">
            <Button block color="success" icon="mdi-arrow-expand-left" @click="showModal('right')">모달 팝업 오른쪽에서 보기</Button>
          </div>
          <div class="col">
            <Button block color="info" icon="mdi-arrow-expand-right" @click="showModal('left')">모달 팝업 왼쪽에서 보기</Button>
          </div>
          <div class="col">
            <Button block color="warning" icon="mdi-arrow-expand-bottom" @click="showModal('bottom')">모달 팝업 하단에서 보기</Button>
          </div>
          <div class="col">
            <Button block color="danger" icon="mdi-fullscreen" @click="showModal('cover')">모달 전체 덮기</Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header h3">
      List Table
    </div>
    <div class="card-body">
      <ListTable
        observer
        check-all
        ref="listTable"
        :width="2500"
        :height="600"
        :header="tableHeader"
        :items="list"
        :loading="dataLoading"
        @observe="getData"
        @checked="checkAll">
        <template #items="{ props, index }: any">
          <tr :key="`list-${props.db_idx}`">
            <td>
              <label class="checkbox-wrap">
                <input :disabled="index % 3 == 0" type="checkbox" name="checklist" :value="props.db_idx" v-model="checkList" />
                <span class="checkbox mdi"></span>
              </label>
            </td>
            <td>{{ props.db_idx }}</td>
            <td>{{ props.mb_name }}</td>
            <td>{{ props.mda_name }}</td>
            <td>
              <Button text :href="props.referer" color="primary" icon="mdi-pencil">{{ props.referer }}</Button>
            </td>
            <td>{{ props.ip }}</td>
            <td class="right">{{ props.reg_date }}</td>
            <td class="center">
              <Button only-icon small icon="mdi-pencil" color="primary">수정</Button>
              &nbsp;
              <Button only-icon small icon="mdi-trash-can" color="warning">삭제</Button>
            </td>
          </tr>
        </template>
      </ListTable>
    </div>
  </div>

  <Modal
    ref="modalPopup"
    title="기본 형태 모달 팝업"
    width="800px"
    v-model="isShow.popup">
    <template #body>
      <div class="section-title mb-5">Section title</div>

      <div class="modal-section">
        <TextField block required label="input1" placeholder="textfield 1" v-model="modal.text1" />
      </div>
      <div class="modal-section">
        <TextField block required label="input2" placeholder="textfield 2" v-model="modal.text2" />
      </div>

      <div class="divider"></div>

      <div class="mdoal-section">
        <CheckButton
          required
          label="checkbox 1"
          color="warning"
          name="checkbutton5"
          :validate="rule.check"
          :items="items"
          v-model="btnChecked"
        />
      </div>
      <div class="section-title mb-5">Section title</div>

      <div class="modal-section">
        <TextField block required label="input1" placeholder="textfield 1" v-model="modal.text1" />
      </div>
      <div class="modal-section">
        <TextField block required label="input2" placeholder="textfield 2" v-model="modal.text2" />
      </div>

      <div class="divider"></div>

      <div class="mdoal-section">
        <CheckButton
          required
          label="checkbox 1"
          color="warning"
          name="checkbutton5"
          :validate="rule.check"
          :items="items"
          v-model="btnChecked"
        />
      </div>
      <div class="section-title mb-5">Section title</div>

      <div class="modal-section">
        <TextField block required label="input1" placeholder="textfield 1" v-model="modal.text1" />
      </div>
      <div class="modal-section">
        <TextField block required label="input2" placeholder="textfield 2" v-model="modal.text2" />
      </div>

      <div class="divider"></div>

      <div class="mdoal-section">
        <CheckButton
          required
          label="checkbox 1"
          color="warning"
          name="checkbutton5"
          :validate="rule.check"
          :items="items"
          v-model="btnChecked"
        />
      </div>
    </template>
    <template #action="{ close }">
      <Button outline @click="close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    esc-close
    title="오른쪽에서 나오는 모달"
    position="right"
    width="40em"
    v-model="isShow.right"
    v-if="isShow.right">
    <template #body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template #action="{ close }">
      <Button outline @click="close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    title="왼쪽에서 나오는 모달"
    position="left"
    width="250px"
    v-model="isShow.left"
    v-if="isShow.left">
    <template #body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template #action="{ close }">
      <Button outline @click="close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    title="하단에서 나오는 모달"
    position="bottom"
    @dispose="isShow.bottom = false"
    v-model="isShow.bottom"
    v-if="isShow.bottom">
    <template #body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template #action="{ close }">
      <Button outline @click="close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    screen-cover
    esc-close
    title="화면 전체 덮기"
    position="bottom"
    v-model="isShow.cover"
    v-if="isShow.cover">
    <template #body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.<br>

      <br>
      <Button block color="danger" @click.prevent="showToast('danger')">토스트 메시지 보기</Button>
      <br>
      <Button block color="dark" @click.prevent="MessageBoxAlert()">알림창 보기</Button>
      <br>
      <Button block color="secondary" @click="showSpinner()">스피너 보기</Button>
      <br>
      <Button block color="info" @click="isShow.in = true">모달에서 모달 열기</Button>

      <Modal esc-close ref="inModal" title="모달안의 모달" width="300px" @dispose="isShow.in = false" v-model="isShow.in">
        <template #body>
          와우~~~~
        </template>
      </Modal>
    </template>
    <template #action="{ close }">
      <Button outline @click="close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>
</template>
