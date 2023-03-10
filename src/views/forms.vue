<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Rules, OptionItem } from '@/components/Form/types'
import type { Modal, ModalOptions } from '@/components/Modal/types'
import type { ColorCase, Toast } from '@/components/Toast/types'
import type { Spinner } from '@/components/Spinner/types'
import type { ValidateForm } from '@/components/Form/ValidateForm/types'

const Modal = inject('Modal') as Modal
const Toast = inject('Toast') as Toast
const Spinner = inject('Spinner') as Spinner

let text = ref<string>('')
let num = ref<number>(0)
let select = ref<string>('')
let selectMulti = ref<any[]>([])
let rangeDate = ref<string[]>(['', ''])
let date = ref<string>('')
let checked = ref<string[]>([])
let radio = ref<string>('')
let btnChecked = ref<string[]>([])
let switchYN = ref<string>('Y')
let switchBool = ref<boolean>(false)

const opt: OptionItem[] = [
  { text: '선택 1', value: '1' },
  { text: '선택 2', value: '2' },
  { text: '선택 3', value: '3' },
  { text: '선택 4', value: '4' },
  { text: '선택 5', value: '5' },
  { text: '선택 6', value: '6' },
  { text: '선택 7', value: '7' },
  { text: '선택 8', value: '8' },
  { text: '선택 9', value: '9' },
  { text: '선택 10', value: '10' },
  { text: '선택 11', value: '11' },
  { text: '선택 12', value: '12' },
  { text: '선택 13', value: '13' },
  { text: '선택 14', value: '14' },
  { text: '선택 15', value: '15' },
]
const items: OptionItem[] = [
  { text: '체크 1', value: '1' },
  { text: '체크 2', value: '2' },
  { text: '체크 3', value: '3' },
  { text: '체크 4', value: '4' },
  { text: '체크 5', value: '5' },
]
const rule: Rules = {
  input: [v => !!v || '입력해야지!!!'],
  number: [v => !(Number(v) === 0) || '0이외의 값을 입력!!!'],
  select: [v => !!v || '선택하라고!'],
  selectMulti: [v => !(v.length < 2) || '2개 이상 선택!'],
  check: [v => !(v.length === 0) || '체크해라!']
}

const modalAlert = (flag?: string): void => {
  if (flag === 'confirm') {
    Modal.confirm({
      title: '재밌는데?',
      message: '드디어 간다!',
      okay: () => {
        console.log('test')
      }
    } as ModalOptions)
  } else {
    Modal.alert('갈까나~!?')
  }
}

const showToast = (color?: ColorCase): void => {
  if (color === 'success') {
    Toast('이런 메시지가 보인다!')
  } else {
    Toast({
      color,
      message: '보인다고~~~'
    })
  }
}

const showSpinner = (delay: number = 0, timeout = 10): void => {
  Spinner.timeout(timeout).delay(delay).show()
}

const form = ref<ValidateForm>()

const checkForm = () => {
  form.value?.validate()
}
</script>

<template>
  <div class="transition-wrap">
    <div class="card shadow-sm">
      <ValidateForm ref="form" class="card-body">
        <div class="row">
          <div class="col">
            <div class="input-with-btn">
              <TextField
                type="url"
                label="텍스트 입력"
                placeholder="이곳에 텍스트를 입력해주세요."
                :validate="rule.input"
                v-model="text"
              />
              <a href="#" class="btn btn-primary with-input">이것은 버튼</a>
            </div>
          </div>
          <div class="col">
            <SelectBox
              block
              label="스타일 선택"
              placeholder="선택해주세요."
              :validate="rule.select"
              :options="opt"
              v-model="select"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <NumberFormat
              block
              label="금액"
              placeholder="숫자만 입력해주세요."
              :validate="rule.input"
              v-model="num"
            />
          </div>
          <div class="col">
            <SelectBox
              block
              multiple
              label="스타일 다중 선택"
              placeholder="여러가지 선택해주세요."
              :validate="rule.selectMulti"
              :options="opt"
              v-model="selectMulti"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <DatePicker
              block
              label="생일"
              placeholder="날짜 선택"
              :validate="rule.input"
              v-model="date"
            />
          </div>
          <div class="col">
            <DatePicker
              block
              range
              label="서비스 기간"
              placeholder="날짜 선택"
              :validate="rule.input"
              v-model="rangeDate"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <CheckButton
              name="checkbutton"
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
        <div class="row mt-2">
          <div class="col">
            <SwitchButton
              true-value="Y"
              false-value="N"
              v-model="switchYN"
            />
          </div>
          <div class="col">
            <SwitchButton
              small
              :label="['꺼짐', '켜짐']"
              v-model="switchBool"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <a href="#" class="block btn btn-dark" @click.prevent="modalAlert()">알림창 보기</a>
          </div>
          <div class="col">
            <a href="#" class="block btn btn-secondary" @click.prevent="modalAlert('confirm')">승인창 보기</a>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <a href="#" class="block btn btn-success" @click.prevent="showToast('success')">토스트 메시지 보기</a>
          </div>
          <div class="col">
            <a href="#" class="block btn btn-info" @click.prevent="showToast('info')">토스트 메시지 보기</a>
          </div>
          <div class="col">
            <a href="#" class="block btn btn-warning" @click.prevent="showToast('warning')">토스트 메시지 보기</a>
          </div>
          <div class="col">
            <a href="#" class="block btn btn-danger" @click.prevent="showToast('error')">토스트 메시지 보기</a>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <Tooltip right message="이건 툴팁입니다.">
              <i class="fas fa-question-circle" style="font-weight: 700; font-size: 30px"></i>
            </Tooltip>
          </div>
          <div class="col">
            <Tooltip bottom :message="['이건 툴팁입니다.', '툴팁의 방향을 조절해주세요.']" />
          </div>
        </div>

        <div class="row">
          <div class="col mt-3 text-center">
            <a href="#" class="block btn btn-primary" @click.prevent="checkForm">폼 체크하기</a>
          </div>
          <div class="row">
        </div>
          <div class="col mt-3 text-center">
            <a href="#" class="block btn btn-secondary" @click.prevent="showSpinner()">스피너 보기</a>
          </div>
          <div class="col mt-3 text-center">
            <a href="#" class="block btn btn-secondary" @click.prevent="showSpinner(3, 30)">스피너 3초후 5초간 보기</a>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <SelectBox
              block
              label="스타일 선택"
              placeholder="선택해주세요."
              :validate="rule.select"
              :options="opt"
              v-model="select"
            />
          </div>
          <div class="col">
            <SelectBox
              block
              multiple
              label="스타일 다중 선택"
              placeholder="여러가지 선택해주세요."
              :validate="rule.selectMulti"
              :options="opt"
              v-model="selectMulti"
            />
          </div>
        </div>
      </ValidateForm>
    </div>
  </div>
</template>