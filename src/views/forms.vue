<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import type { Rules, OptionItem } from '@/components/Form/types'
import type { MessageBox, MessageBoxOptions } from '@/components/MessageBox/types'
import type { ToastColorCase, Toast } from '@/components/Toast/types'
import type { Spinner } from '@/components/Spinner/types'
import type { ValidateForm } from '@/components/Form/ValidateForm/types'
import type { DropMenuItem  } from '@/components/DropMenu/types'
import { dropMenuTransition, dropMenuPosition } from '@/components/DropMenu/types'
import type { ModalMethods } from '@/components/Modal/types'
import { TableHeader, TableListItem } from '@/components/ListTable/types'

const MessageBox = inject('MessageBox') as MessageBox
const Toast = inject('Toast') as Toast
const Spinner = inject('Spinner') as Spinner

let text = ref<string>('')
let num = ref<number>(0)
let select = ref<string>('')
let selectMulti = ref<any[]>([])
let date1 = ref<string>('')
let date2 = ref<string>('')
let rangeDate = ref<string[]>(['', ''])
let checked = ref<string[]>([])
let radio = ref<string>('')
let btnChecked = ref<string[]>([])
let switchYN = ref<string>('N')
let switchBool = ref<boolean>(false)

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
  { text: '원신', action: () => {
    console.log('메뉴 1 click')
  } },
  { text: '바이오하자드', action: () => {
    console.log('메뉴 2 click')
  } },
  { text: '갓 오브 워', action: () => {
    console.log('메뉴 3 click')
  } },
  { text: '스파이더맨', action: () => {
    console.log('메뉴 4 click')
  } },
  { text: '호라이즌: 포비든 웨스트', action: () => {
    console.log('메뉴 5 click')
  } },
  { text: '레대 데드 리댐션', action: () => {
    console.log('메뉴 6 click')
  } },
]

const MessageBoxAlert = (flag?: string): void => {
  if (flag === 'confirm') {
    MessageBox.confirm({
      title: '재밌는데?',
      message: '드디어 간다!',
      okay: () => {
        console.log('test')
      }
    } as MessageBoxOptions)
  } else {
    MessageBox.alert('갈까나~!?')
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
  console.log('click')

  setTimeout(() => {
    isLoading.value = false
  }, 5000)
}

const modalPopup = ref<ModalMethods>()
const modalRight = ref<ModalMethods>()
const modalLeft = ref<ModalMethods>()
const modalBottom = ref<ModalMethods>()
const modalCover = ref<ModalMethods>()

let isShow = reactive<{
  [index: string]: boolean
}>({
  popup: false,
  right: false,
  left: false,
  bottom: false,
  cover: false,
})

const showModal = (flag: string): void => {
  isShow[flag] = true
}

const list = ref<TableListItem[]>([
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
  { field1: 1, field2: '원신', field3: 'RPG', field4: 'mihoyo' },
])
const tableHeader: TableHeader[] = [
  { text: '번호', width: '', sort: false },
  { text: '게임 제목', width: '', sort: false },
  { text: '장르', width: '', sort: false },
  { text: '개발 업체', width: '', sort: false },
  { text: '처리', width: '', sort: false },
]
</script>

<template>
  <div class="wrap">
    <ValidateForm ref="form1">
      <div class="card mt-3">
        <div class="card-header h3">
          List Table
        </div>
        <div  class="card-body">
          <ListTable :header="tableHeader" :items="list">
            <template #items="{ props, index }: any">
              <tr>
                <td>{{ props.field1 }}</td>
                <td>{{ props.field2 }}</td>
                <td>{{ props.field3 }}</td>
                <td>{{ props.field4 }}</td>
                <td>
                  <a href="#">버튼1</a>
                  <a href="#">버튼2</a>
                </td>
              </tr>
            </template>
          </ListTable>
      </div>
    </div>

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
                max-length="30"
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
                max-length="30"
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
                max-length="30"
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
          <div class="row">
            <div class="col mt-3 text-center">
              <Button block color="primary" @click.prevent="checkForm()">폼 체크하기</Button>
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
                range
                label="서비스 기간 (날짜 구분 기본)"
                :placeholder="['시작일 선택', '종료일 선택']"
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
                max-length="3"
                :validate="rule.check"
                :items="items"
                v-model="checked"
              />
            </div>
            <div class="col">
              <CheckButton
                type="radio"
                name="checkbutton2"
                :validate="rule.select"
                :items="items"
                v-model="radio"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <CheckButton
                button
                name="checkbutton3"
                :validate="rule.check"
                :items="items"
                v-model="btnChecked"
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
                :label="['꺼짐', '켜짐']"
                v-model="switchBool"
              />
            </div>
            <div class="col">
              <SwitchButton
                checkbox
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
          <div class="col">
            <Button block color="primary">color: primary</Button>
          </div>
          <div class="col">
            <Button block color="success">color: success</Button>
          </div>
          <div class="col">
            <Button block color="info">color: info</Button>
          </div>
          <div class="col">
            <Button block color="warning">color: warning</Button>
          </div>
          <div class="col">
            <Button block color="danger">color: danger</Button>
          </div>
          <div class="col">
            <Button block color="dark">color: dark</Button>
          </div>
          <div class="col">
            <Button block color="secondary">color: secondary</Button>
          </div>
          <div class="col">
            <Button block color="light">color: light</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <Button block color="primary" icon="file_download">with icon (left)</Button>
          </div>
          <div class="col">
            <Button block icon-right color="success" icon="reply">with icon (right)</Button>
          </div>
          <div class="col">
            <Button block disabled color="info" @click="showLoading">disabled 활성화</Button>
          </div>
          <div class="col">
            <Button block :disabled="isLoading" :loading="isLoading" icon-right color="warning" @click="showLoading">클릭하면 5초간 스피너가 보이고 disabled 됩니다.</Button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col flex justify-around">
            <Button only-icon color="primary" icon="file_download"></Button>
            <Button only-icon color="success" icon="reply"></Button>
            <Button only-icon color="info" icon="east"></Button>
            <Button only-icon color="warning" icon="restart_alt"></Button>
            <Button only-icon color="danger" icon="open_in_new"></Button>
            <Button only-icon color="dark" icon="ios_share"></Button>
            <Button only-icon color="secondary" icon="save_alt"></Button>
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
            <DropMenu :width="200" :items="dropMenuItem">
              <Button icon-right icon="expand_more" color="primary">드롭 메뉴(slide) 보기</Button>
            </DropMenu>
          </div>
          <div class="col">
            <DropMenu :position="dropMenuPosition.right" :transition="dropMenuTransition.fade" :items="dropMenuItem">
              <Button icon-right icon="expand_more" color="success">메뉴 오른쪽(fade) 보기</Button>
            </DropMenu>
          </div>
          <div class="col">
            <DropMenu :width="200" :position="dropMenuPosition.left" :transition="dropMenuTransition.scale" :items="dropMenuItem">
              <Button icon-right icon="expand_more" color="info">메뉴 왼쪽(scale) 보기</Button>
            </DropMenu>
          </div>
          <div class="col">
            <DropMenu :position="dropMenuPosition.top" :items="dropMenuItem">
              <Button icon-right icon="expand_more" color="secondary">메뉴 위쪽 보기</Button>
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
          <div class="col">
            <Tooltip right hovering message="이건 툴팁입니다.">
              <div class="flex-row">
                <span class="material-icons" style="font-size: 30px">help_outline</span>
                마우스를 올리면 툴팁이 보입니다.
              </div>
            </Tooltip>
          </div>
          <div class="col">
            <div class="flex-row">
              오른쪽 아이콘을 클릭해주세요.
              <Tooltip
                bottom
                btn-close
                title="제목이거든요"
                :message="['이건 툴팁입니다.', '툴팁의 방향을 조절해주세요.']"
              />
            </div>
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
            <Button block color="primary" icon="web_asset" @click="showModal('popup')">
              모달 팝업 보기
            </Button>
          </div>
          <div class="col">
            <Button block color="success" icon="swipe_left_alt" @click="showModal('right')">모달 팝업 오른쪽에서 보기</Button>
          </div>
          <div class="col">
            <Button block color="info" icon="swipe_right_alt" @click="showModal('left')">모달 팝업 왼쪽에서 보기</Button>
          </div>
          <div class="col">
            <Button block color="warning" icon="swipe_up_alt" @click="showModal('bottom')">모달 팝업 하단에서 보기</Button>
          </div>
          <div class="col">
            <Button block color="danger" icon="fullscreen" @click="showModal('cover')">모달 전체 덮기</Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    ref="modalPopup"
    title="기본 형태 모달 팝업"
    @dispose="isShow.popup = false"
    v-model="isShow.popup">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.
    </template>
    <template v-slot:action>
      <Button color="light" @click="modalPopup?.close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    esc-close
    ref="modalRight"
    title="오른쪽에서 나오는 모달"
    position="right"
    width="40em"
    @dispose="isShow.right = false"
    v-model="isShow.right"
    v-if="isShow.right">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template v-slot:action>
      <Button color="light" @click="modalRight?.close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    ref="modalLeft"
    title="왼쪽에서 나오는 모달"
    position="left"
    width="250px"
    @dispose="isShow.left = false"
    v-model="isShow.left"
    v-if="isShow.left">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template v-slot:action>
      <Button color="light" @click="modalLeft?.close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    ref="modalBottom"
    title="하단에서 나오는 모달"
    position="bottom"
    @dispose="isShow.bottom = false"
    v-model="isShow.bottom"
    v-if="isShow.bottom">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template v-slot:action>
      <Button color="light" @click="modalBottom?.close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>

  <Modal
    screen-cover
    esc-close
    ref="modalCover"
    title="화면 전체 덮기"
    position="bottom"
    @dispose="isShow.cover = false"
    v-model="isShow.cover"
    v-if="isShow.cover">
    <template v-slot:body>
      무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.무궁화 꽃이 피었습니다.
    </template>
    <template v-slot:action>
      <Button color="light" @click="modalCover?.close()">닫기</Button>
      &nbsp;&nbsp;
      <Button color="primary">확인</Button>
    </template>
  </Modal>
</template>
