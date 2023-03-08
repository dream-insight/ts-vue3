# Form validation Components
 validateForm Component와 호환 가능한 폼을 통해 간편히 유효성 검사를 실행하기 위해 만들어진 컴포넌트 모음입니다.<br>
 CSS 변경시에는 컴포넌트 내부 CSS를 복사, 제거 후 형식에 맞춰서 작성하세요.

* [CheckButton](#1-CheckButton)
* [TextField](#2-TextField)
* [NumberFormat](#3-NumberFormat)
* [SelectBox](#4-SelectBox)
* [SwitchButton](#5-SwitchButton)
* [DatePicker](#6-DatePicker)
* [ValidateWrap](#7-ValidateWrap)
* [ValidateForm](#8-ValidateForm)

---

```vue
<script setup lang="ts">
export type RuleFunction = (v: any) => string | boolean

export interface Rules {
  [index: string]: RuleFunction[]
}

export interface OptionItem {
  text: string
  value: any
}
</script>
```


## 1. CheckButton
  * <code>\<input type="checkbox" /></code>, <code>\<input type="radio" /></code> 버튼을 생성합니다.

### 1.1. 사용방법
* <code>all</code> 옵션을 설정해 주면 빈 값의 '전체' 버튼을 자동 생성해줍니다.
* checkbox, radio 버튼의 특성상 name 값을 필히 설정해줘야 합니다.
* checkbox model의 경우 <code>all</code> 설정이 되어 있으면 data 변수의 기본값을 <code>['']</code>로 해줘야 정상적으로 '전체'에 체크 됩니다.
* <code>button</code> 옵션을 설정해주면 버튼 디자인으로 항목이 나열 됩니다.
```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

let checkbox1 = ref<any[]>([])
let checkbox2 = ref<string[]>([''])
let radio = ref<string>('')

const opt = reactive<OptionItem[]>({
  checkbox: [],
})

const rules: Rules = {
  checkbox: [v => !(v.length == 0) || '항목을 하나 이상 선택해주세요.'],
}

for (let value: number = 1; value <= 10; value++) {
  opt.checkbox.push({ text: `체크버튼${value}`, value })
}
</script>

<template>
  <p>
    <h5>버튼 형식 checkbox</h5>
    <CheckButton
      button
      name="check1"
      :max-check="3"
      :validate="rules.checkbox"
      :items="opt.checkbox"
      v-model="checkbox1"
    />
  </p>
  <p>
    <h5>일반 checkbox</h5>
    <CheckButton
      all
      name="check2"
      :items="opt.checkbox"
      v-model="checkbox2"
    />
  </p>
  <p>
    <h5>radio</h5>
    <CheckButton
      type="radio"
      name="check3"
      :validate="rules.radio"
      :items="opt.checkbox"
      v-model="radio"
    />
  </p>
</template>
```

### 1.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| modelValue | String, Number, String[], Number[] | <code>none</code> | false | v-model |
| clickIndex | Number | <code>-1</code> | false | v-model:clickIndex - 클릭된 button의 index |
| type | String | <code>checkbox</code> | false | checkbox 또는 radio 선택 |
| name | String | <code>''</code> | *true* | input name 애드립뷰트 값을 설정 |
| items | Object[] | <code>[]</code> | *true* | 항목을 만들 배열 데이터 <br> [{ text: '', value: '' }] |
| all | Boolean | <code>false</code> | false | '전체' 항목을 추가 해주는 옵션 |
| maxCheckLength | Number | <code>0</code> | false | 0이상의 값 부여시, 체크된 항목의 수량이 maxCheck 만큼으로 재한 |
| validate | Function[] | <code>[]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열여 입력 |
| errorMessage | String | <code>''</code> | false | 강제로 에러 메시지를 출력, 유효성 검사에서 통과 하지 못 함 |
| button | Boolean | <code>false</code> | false | checkbox, radio 폼이 버튼 형식으로 디자인 변경 |

:arrow_up: [목차](#-Form-validation-Components)

---

## 2. InputText
  * <code>\<input type="text" /></code>, <code>\<textarea>\</textarea></code> 입력 필드를 생성 합니다.

### 2.1. 사용방법
```vue
<script setup lang="ts">
import { ref } from 'vue'

let text = ref<string>('')
let area = ref<string>('')

const rule: RuleFunction[] = [v => !!v || '필수 입력 항목입니다.']
</script>

<template>
  <p>
    <h5>input field</h5>
    <TextField
      block
      placeholder="이곳에 입력해주세요"
      :validate="rule"
      v-model="text"
    />
  </p>
  <p>
    <h5>textarea</h5>
    <TextField
      block
      multiline
      placeholder="이곳에 입력해주세요"
      :rows="10"
      :validate="rule"
      v-model="area"
    />
  </p>
</template>
```

### 2.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| modelValue | String | <code>''</code> | false | v-model |
| type | String | <code>text</code> | false | text or password, tel,  |
| multiline | Boolean | <code>false</code> | false | textarea 폼으로 변경 |
| block | Boolean | <code>false</code> | false | display: block 설정 |
| rows | Number | <code>5</code> | false | multiline 설정시 textarea 높이를 설정 |
| width | String, Number | <code>none</code> | false | 넓이 설정 (block 보다 우선) |
| height | String, Number | <code>none</code> | false | multiline 설정시 textarea 높이를 설정 (rows 보다 우선) |
| validate | Function[] | <code>[Function]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력<br> pattern 옵션이 설정 되어 있는 경우 pattern 검수가 먼저 이루어 집니다. |
| blurValidate | Boolean | <code>false</code> | false | 폼의 커서가 없어 질때 유효성 검사를 할 것인지 여부 |
| maxLength | String, Number | <code>none</code> | false | 최대 입력 가능한 문자 수 |
| errorMessage | String | <code>''</code> | false | 강제로 오류 메시지를 표시 |
| disabled | Boolena | <code>false</code> | false | 폼 사용불가 처리 |
| readonly | Boolena | <code>false</code> | false | 폼 입력 불가 처리 |
| autofocus | Boolena | <code>false</code> | false | 화면 로드시 커서가 자동으로 들오 오도록 할 것인지 |
| pattern | String | <code>case</code> | false | value 값에 대해 정규식 검사 실행 후 매칭되지 않을 경우 validation 오류 처리 |
| | | eng | | 영문만 입력 가능 |
| | | engnum | | 영문, 숫자만 입력 가능 |
| | | id | | 영문, 숫자, underbar(_) 입력가능 |
| | | num | | 숫자만 입력 가능 |
| | | wordnum | | 영문, 숫자 혼합 입력 |
| | | password | | 영문, 숫자, 특수문자 2가지 이상 조합 입력 |
| | | doamin | | 도메인 형식 입력 |
| | | email | | 이메일 형식 입력 |
| | | tel | | 전화번호 형식 입력 (10~11자리) |

:arrow_up: [목차](#-Form-validation-Components)

---

## 3. NumberFormat
  * <code>\<input type="text" /></code> 폼에 숫자만 입력 가능한 필드를 생성합니다.
  * 자동으로 1,000 단위로 콤마를 생성 해줍니다.
  * model 변수에는 숫자(<code>Number</code>)형으로 입력됩니다.(콤마가 모두 제거된 상태의 Number Casting)
  * 필드 값이 없을 경우 자동으로 0을 표시 합니다.
  * 소숫점 입력은 불가능합니다.

### 3.1. 사용방법
```vue
<script setup lang="ts">
import { ref } from 'vue'

let number = ref<number>(0)
const rule: RuleFunction[] = [v => !!v || '필수 입력 항목입니다.']
</script>

<template>
  <p>
    <h5>input field number</h5>
    <NumberFormat
      :validate="rule"
      v-model="number"
    />
  </p>
</template>
```

### 3.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| modelValue | String | <code>''</code> | false | v-model |
| label | String | <code>''</code> | false | 라벨 표시 |
| placeholder | String | <code>''</code> | false | placeholder 표시 |
| validate | Function[] | <code>[Function]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력 |
| errorMessage | String | <code>''</code> | false | 강제로 오류 메시지를 표시 |
| disabled | Boolena | <code>false</code> | false | 폼 사용불가 처리 |
| block | Boolean | <code>false</code> | false | display: block 설정 |
| width | String, Number | <code>none</code> | false | 넓이 설정 (block 보다 우선) |
| autofocus | Boolena | <code>false</code> | false | 화면 로드시 커서가 자동으로 들오 오도록 할 것인지 |
| maxLength | String, Number | <code>none</code> | false | 최대 입력 가능한 문자 수 |
| readonly | Boolena | <code>false</code> | false | 폼 입력 불가 처리 |

:arrow_up: [목차](#-Form-validation-Components)

---

## 4. SelectBox
* <code>select</code>와 유사한 기능을 구현하는 폼을 생성한다.

### 4.1. 사용방법
```vue
<script setup lang="ts">
import { ref  } from 'vue'

let select = ref<string>('')

const opt = ref<OptionItem[]>([])

const rule: RuleFunction[] = [v => !!v || '필수 선택 항목입니다.']

for (let value = 1; value <= 10; value++) {
  opt.push({ text: `선택 - ${value}`, value })
}
</script>

<template>
  <p>
    <h5>select box</h5>
    <SelectBox
      placeholder="한 가지 항목을 선택해주세요"
      :validate="rule"
      :options="opt"
      v-model="select"
    />
  </p>
</template>
```

### 4.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| modelValue | Any | Any[] | <code>''</code> | *true* | v-model |
| selectedIndex | Number | <code>-1</code> | false | v-model:selectedIndex - 선택된 option의 index 값 |
| options | Object[] | <code>[]</code> | false | option 필드를 생성할 데이터<br>[{ text: '', value: '' }] |
| label | String | <code>''</code> | false | label 문자 표시 |
| placeholder | String | <code>''</code> | false | options 첫 번째 배열에 [{ text: placeholder, value: '' }] 추가 |
| block | Boolean | <code>false</code> | false | display: block 표시 |
| validate | Function[] | <code>[]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력 |
| errorMessage | String | <code>''</code> | false | 강제로 오류 메시지를 표시 |
| width | String, Number | <code>none</code> | false | 넓이 설정 (block 보다 우선) |
| multiple | Boolean | <code>none</code> | false | 넓이 설정 (block 보다 우선) |

:arrow_up: [목차](#-Form-validation-Components)

---

## 5. SwitchButton
  * 스위치 형태의 버튼을 생성합니다.
  * true(ON), false(OFF) 또는 이에 대칭하는 2개의 값을 설정 가능합니다.

### 5.1. 사용방법
```vue
<script setup lang="ts">
import { ref } from 'vue'

let bool = ref<boolean>(false)
let boolValue = ref<string>('T')
let label = ref<string[]>(['동의 안함', '동의'])
</script>

<template>
  <p>
    <h5>switch button</h5>
    <SwitchButton validate="설정으로 바꿔주세요." v-model="bool" />
  </p>
  <p>
    <h5>small size switch button</h5>
    <SwitchButton
      small
      validate
      true-value="T"
      false-value="F"
      :label="label"
      v-model="boolValue"
    />
  </p>
</template>
```

### 5.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| modelValue | String | <code>''</code> | false | v-model |
| small | Boolean | <code>false</code> | false | 버튼의 크기를 작게 생성합니다 |
| label | String[] | <code>[]</code> | false | 스위치에 사용자가 설정한 라벨을 표시 합니다, [false label, true label] |
| validate | Boolean, String | <code>none</code> | false | 유효성 검사 여부를 판단합니다.<br>문자열을 입력할 경우 해당 문자열을 오류 메시지로 보여줍니다.<br>문자열을 설정하지 않을 경우 ON 상태의 라벨을 기준으로 오류메시지를 표시 합니다.|
| trueValue | String | <code>''</code> | false | 버튼을 ON 상태의 값을 지정합니다. |
| falseValue | String | <code>''</code> | false | 버튼을 OFF 상태의 값을 지정합니다. |
| readonly | Boolean | <code>false</code> | false | 버튼 수정 불가 옵션 |

:arrow_up: [목차](#-Form-validation-Components)

---

## 6. DatePicker
* 날짜 선택 가능한 입력 필드를 생성합니다.

### 6.1. 사용방법
```vue
<script setup>
import { ref, reactive } from 'vue'

let date = ref<string>('')
let dateRange = ref<string[]>(['', ''])

const rules: Rules = {
  date: [v => !!v || '날짜를 선택해주세요.']
}
</script>

<template>
  <p>
    <h5>date picker</h5>
    <DatePicker :validate="rules.date" v-model="date" />
  </p>
  <p>
    <h5>range date picker</h5>
    <DatePicker range :validate="rules.date" v-model="dateRange" />
  </p>
</template>
```

### 6.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| modelValue | String, String[] | <code>none</code> | false | v-model, option range 설정시 ['', ''] 설정 필요 |
| label | String, String[] | <code>none</code> | false | 라벨 표시 |
| placeholder | String, String[] | <code>none</code> | false | 입력 필드에 placeholder 표시<br>option range 설정시 [시작일, 종료일] 형태로 입력 |
| range | Boolean | <code>false</code> | false | 시작일과 종료일을 선택할 수 있도록 설정 |
| block | Boolean | <code>false</code> | false | display: block 표시 |
| validate | Function[] | <code>[]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력 |
| separator | String | <code>-</code> | false | 년, 월, 일 사이 구분 문자 설정 |
| minYear | Number | <code>1900</code> | false | 선택 가능한 최소 년도 설정 |
| maxYear | Number | <code>now Year + 100</code> | false | 선택 가능한 최대 년도 설정 |

:arrow_up: [목차](#-Form-validation-Components)

---

## 7. ValidateWrap
* 유효성 검사가 필요한 개체를 감싸고, model 변수를 설정하여 ValidateForm과 호환 되도록 만들어줍니다.

### 7.1. 사용방법
```vue
<script setup lang="ts">
import { ref } from 'vue'

let files = ref([])

const rules = {
  file: [v => !!v.length || '파일을 선택해주세요.'],
}

function fileSelected(evt) {
  if (evt.target.files.length) {
    files.value = evt.target.files
  } else {
    files.value = []
  }
}
</script>

<template>
  <p>
    <h5>validate wrapping</h5>
    <ValidateWrap :validate="rules.file" :check-value="files">
      <input type="file" @change="fileSelected" />
    </ValidateWrap>
  </p>
</template>
```

### 7.2. Props

| Name | Type | Default | Require | Description |
|-------|---- |---------|---------|-------------|
| checkValue | Any | <code>none</code> | *true* | 유효성 검사를 할 model 변수 설정 |
| validate | Function[] | <code>[]</code> | false | 폼 유효성 검사에 필요한 callback 함수를 배열에 나열 입력 |
| errorMessage | String | <code>''</code> | false | 강제로 오류 메시지를 표시 |

:arrow_up: [목차](#-Form-validation-Components)

---

## 8. ValidateForm
* ValidateForm 하위 호환 가능한 개체에 대해 유효성 검사 가능한 컴포넌트
* ValidateForm 컴포넌트에 필히 <code>ref</code> 설정을 하고 <code>RefName.value?.validate()</code> 수행하여 유효성 검사를 진행합니다.

### 8.1. 사용방법
> ValidateForm 예제를 확인 하세요. [예제 보기](https://github.com/dream-insight/vue3/blob/main/src/views/form.vue)

### 8.2. Component API Method
#### <code>Boolean {RefName}.value?.validate()</code>
* 유효성 검사를 실행 합니다.

:arrow_up: [목차](#-Form-validation-Components)

---

### UPDATE HISTORY

* Vue 3 Components with Typescript : 2023.02.20 김종윤 수석
