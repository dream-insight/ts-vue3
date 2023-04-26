# Vue 3 with Typescript Style Guide

## 참조 문서

* [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Vue 3.x](https://v3.vuejs.org/)
* [작성 참조 - AirBnB](https://github.com/tipjs/typescript-style-guide)
---

## 목차

1. [기본 형태](#1-기본-형태)
2. [명명 규칙](#2-명명-규칙)
3. [변수 선언과 자료형](#3-변수-선언과-자료형-정의)
4. [함수](#4-함수)
5. [객체 속성](#5-객체-속성)
6. [문자열](#6-문자열)
7. [연산자](#7-연산자)
8. [블럭](#8-블럭)
9. [반복문](#9-반복문)
10. [세미콜론](#10-세미콜론)
11. [공백과 들여쓰기](#11-공백과-들여쓰기)
12. [코멘트](#12-코멘트)
13. [Vue 템플릿](#13-Vue-템플릿)
14. [컴포넌트 SFC](#14-컴포넌트-SFC)
15. [Provide & Inject](#15-Provide-&-Inject)
16. [이벤트 버스](#16-이벤트-버스)
17. [상태 관리자 Vuex](#17-상태-관리자-Vuex)
18. [라우터 Router](#18-라우터-Router)
19. [env 파일 활용](#19-env-파일-활용)

## TypeScript 목차

1. [명명 방식](#1-명명-방식)
2. [import](#2-import)
3. [유형별 정의 방식](#3-유형별-정의-방식)
4. [Props, Emits 정의](#4-Props,-Emits-정의)
5. [ENUM](#5-ENUM)


## Component & Plugin
* [Component & Plugin 모음](https://github.com/dream-insight/ts-vue3/tree/main/src/components)

---

## 1. 기본 형태

### 1.1. VueJS v3.x Framework 기본 형식은 아래와 같이 지켜 주세요.
* Options API는 사용하지 않습니다. 모든 코드는 Composition API를 사용하세요.
* <code>\<script setup lang="ts">\</script></code> 테그로 작성합니다.
* 코드는 기능단위로 분리 하여 작성하고, 라이프 사이클 정의는 최하단에 표기 합니다.
* 일부 API는 <code>import</code>하지 않아도 번들시 처리 됩니다.
```vue
<script setup lang="ts">
import ComponentA from './componentA'
import ComponentB from './componentB'

import { ref, watch, computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { OptionItem } from '@/types'

// vue에서 제공 되는 각종 APIs 정의
const props = defineProps<{ ... }>({ ... })
const store = useStore()
const router = useRouter()

// 로직별 코드 정의
// 로직 1
const comp = ref<HTMLElement>()
let text = ref<string>('test')

watch(text, () => {
  // something to do
})

const user = computed<string>(() => store.state.user)

// 로직 2
const options = reactive<OptionItem>({
  text: 'text1',
  isTrue: false,
  list: [],
})

watch(() => options.text, (txt, preTxt) => {
  // something to do
})

const getList = (): void => {
  // something to do
}


// life cycle 정의
// created
text.value = 'start'
getList()

onMounted(() => {
  // something to do
})

onUpdated(() => {
  // something to do
})
</script>

<template>
  <ComponentA ref="comp" />
  <ComponentB></ComponentB>
</template>

<style lang="scss">
...
</style>
```

:arrow_up: [목차](#목차)

## 2. 명명 규칙

### 2.1. 공통
* 영문 카멜케이스(Camel-Case)로 작성합니다.
* 컴포넌트 import 시 파스칼케이스(Pascal-Case)로 구분하여 주세요.
* 이름 가장 앞자리를 숫자로 선언하면 안됩니다.
> 파일, 폴더명 역시 동일하게 취급합니다.
* 필히 한 단어 이상의 유의미한 단어로 조합하고, 의미가 불분명한 줄임 단어를 사용하지 않습니다.
> 개발시 많이 사용되는 btn, chk, bln, lbl 등등의 줄임단어는 사용하여도 무방합니다.
* JS의 예약어를 변수나 함수, class명으로 사용 하지 않습니다.
> 단, plugin, component를 참조하여 호출 하는 경우는 허용 합니다.

### 2.2. 모듈 export, import
* <code>export default</code> 된 모듈은 명확한 의미부여하여 명명 해주세요.
* 구조화 된 모듈은 명명된 이름을 그대로 사용하고 as를 통한 재명명은 하지 않도록 합니다.
```typescript
// module/category
export { getCategory }

// Bad
import { getCategory as category } from './module/category'

// Good
import { getCategory } from './module/category'


// module/lib.ts
export default codeLib

// Bad
import library from './module/lib'

// Good
import codeLib from './module/lib'
```

:arrow_up: [목차](#목차)

---

## 3. 변수 선언과 자료형 정의

### 3.1. 변수 선언시 타입에 맞게 정의 합니다.
* 형식상 <code>ref()</code>의 변수는 <code>let</code>으로 선언합니다.
* <code>Array</code>는 <code>ref()</code>로 초기화 되지만 <code>const</code>로 선언합니다.
* <code>reactive()</code> 변수는 <code>const</code>로 선언합니다.
* 컴포넌트, HTML DOM 참조 선언은 <code>ref<...>()</code>로 초기화 하고 <code>const</code>로 선언합니다.
```typescript
import { ref, reactive } from 'vue'

let name = ref<string>('')              // String -> 공백
let index = ref<number>(-1)             // Number -> 숫자 형식의 기본값
let bool = ref<boolean>(false)          // Boolean -> true or false (0, 1 사용 불가)
const ary = ref<string[]>([])           // Array -> 빈 배열
const obj = reactive<Option>({})        // Object -> 빈 객체
const component = ref<HTMLElement>()    // 컴포넌트, html dom 등 객체 참조
```

### 3.2. null, undefined
* <code>null</code> 값 초기화는 <code>ref()</code>(객체 참조) 외에는 사용하지 않습니다.
* <code>undefined</code>로 초기화 하여서는 안됩니다.
```typescript
import { ref, reactive } from 'vue'

// Bad
let name = ref<string | null>(null)
const ary = ref<any[] | null>(null)
const obj = reactive<Options | undefined>(undefined)

// Good
let name = ref<string>('')
const ary = ref<any[]>([])
const obj = reactive<Option>({})
// or
const obj = reactive<Option | null>(null)
```

### 3.3. 변수 선언 시 콤마를 사용하여 다중 선언 하는 방식은 좋지 않습니다.
```typescript
// Bad
let alpha: string = '', bravo: string = '', charlie: string = ''
const dream: string = 'insight', by: string = 'dream'

// Good
let alpha: string = ''
let bravo: string = ''
let charlie: string = ''
const dream: string = 'insight'
const by: string = 'dream'
```
> 코드를 작성하면서 간혹 비슷한 형태의 여러코드를 수정해야 하는 때도 있습니다.<br>
그러한 그러한 상황에 위와 같은 코드 나열 방식은 우리를 매우 불편하게 합니다.

### 3.4. 의미 없는 ref, reactive 변수 초기화
* 변이 감지가 필요 없는 변수는 <code>ref()</code>, <code>reactive()</code> 선언하지 않습니다.
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Bad (엑세스 동안 변이 되지 않는 변수)
let dream = ref<string>('드림')

// Good
const dream: string = '드림'

let count = ref<number>(0)
let text = ref<string>('값이 변하지 않습니다.')

const increase = (): void => {
  count.value++
}

const changeText = computed<string>(() => `${dream.value}인사이트 = ${text.value}`)
</script>

<template>
  <p><input type="text" v-mode="text" /></p>
  <p>{{ changeText }}
  <br />
  <br />
  <p>{{ count }}</p>
  <p>
    <button type="button" @click="increase">값 증가</button>
  </p>
</template>
```

:arrow_up: [목차](#목차)

---

## 4. 함수
### 4.1. 함수는 화살표 함수를 사용하여 선언하세요.
```typescript
// bad (함수식)
const func = function(): void {
  ...
}

// not good (hoist 문제가 있을 때 사용가능)
function func(): void {
  ...
}

// Good (화살표 함수식)
const func = (): void => {
  ...
}
```

### 4.2. 함수를 명확히 구분하여 사용하세요. (void, return)
* 대부분의 언어에서는 함수에 대해 명확히 정의 하기를 요구합니다.
* 반환 값이 있는 함수 <code>number, string, boolean</code> 등등
* 단순 기능 수행의 <code>void</code> 입니다.
```typescript
import { useStore } from 'vuex'

const store = useStore()
let userName: string = ''

const getUserName = (): string => {
  let text = '당신은 ' + store.getters.getFamilyName +
            '씨이고, 이름은 ' + store.getters.getYourName + '입니다'

  return text
}

userName = getUserName()

const setUserName = (): void => {
  // void
  userName = '당신은 ' + store.getters.getFamilyName +
            '씨이고, 이름은 ' + store.getters.getYourName + '입니다'
}

console.log(userName)
```
* 위 두가지 함수는 거의 비슷한 일을 하지만, 명백히 다른 함수 입니다.
* 우리는 보통 위와 같이 사용 하고 있지만, 쉽게 아래와 같은 실수를 범하게 됩니다.
```typescript
let name: string = '홍길동'
let familyName: string = ''

// Bad
const isUserName = (): ??? => {
                    // ^^^ 어떤 타입을 지정해야 할까요?
  if (name.substr(0, 1) !== '김') {
    return false // 단순히 함수 수행을 종료 하고자 할때는 return
  } else {
    familyName = name.substr(0, 1)
  }
}

isUserName()

// Good
const setFamilyName = (): void => {
  if (name.substr(0, 1) !== '김') {
    return
  }

  familyName = name.substr(0, 1)
}

setFamilyName()
```
* 위와 같이 함수 수행을 종료하고자 <code>return false</code>를 사용하는 것은 아무 의미 없습니다.
* 따라서 함수 수행을 종료하고자 할 때는 오직 <code>return</code>으로 종료시켜 주세요.
> 다행이 Typescript 로 작성 할 경우 해당 방식의 코드는 인정되지 않습니다. 하지만 일반 적인 javascript를 작성 할때도
위와 같은 사항을 잊어서는 안됩니다.

### 4.3. 함수의 인자(parameters)는 참조로만 사용하세요.
* 함수의 전달 인자에 default 값을 사용하여, 제어 문에서 그 값을 비교하세요.
* 전달 인자의 값을 직접적으로 변이 하여 사용하게 되면, 찾기 힘든 오류가 발생 할 수도 있습니다.
```typescript
// Bad
const getSizeOfArray = (prm?: string[]): number => {
  if (!prm) {
    prm = []
  }

  return prm.length
}

// Good
const getObjectLength = (prm?: object = {}): number => Object.keys(prm).length
```

:arrow_up: [목차](#목차)

---

### 4.4. 함수에 전달되어 지는 함수(callback)는 필히 화살표 무명함수를 사용하세요.
```typescript
const ary: ReadonlyArray<number> = [1, 2, 3, 4, 5]

// Bad
const bad: number[] = ary.map(function(num) {
  return num + 5
})

// Good
const good: number[] = ary.map(item => {
  return num + 5
})
```

### 4.5. 간단한 연산에 대해서는 암시적 <code>return</code>을 이용하여 주세요.
```typescript
const ary: ReadonlyArray<number> = [1, 2, 3, 4, 5]

// it's okay
const okay1: number[] = ary.map((num) => Number(intNum) + ((Number(intNum) / 2) * 0.1))

// it's okay
const okay2: number[] = ary.map((num) => {
  let intNum = Number(num)

  return intNum + ((intNum / 2) * 0.1)
})

// Good
const good: number[] = ary.map(num => num + 5)

// Bad
const bad: number[] = ary.map((num) => {
  return num + 5
})
```

### 4.6. 함수의 인자가 1개인 경우 괄호를 생략할 수 있고, 사용되지 않는 인자는 생략 하여도 됩니다.
> 단, interface가 정의 되어 있거나, 타입 유추가 가능한 경우에만 가능합니다.
```typescript
const ary: ReadonlyArray<number> = [1, 2, 3, 4, 5]

// Good (callback)
ary.map(item => item  + 1)

// Good
ary.map((item, index) => item + index)
```

:arrow_up: [목차](#목차)

---

## 5. 객체 속성

### 5.1. 속성에 값을 할당할 시 가능한한 단축구문 사용하세요.
```typescript
interface Option {
  text: string
  value: string
}

let text: string = '드림인사이트'
let value: string = 'dreaminsight'

// Bad
const obj: Option = {
  text: text,
  value: value,
}

// Good
const obj: Option = { text, value }
```

### 5.2. 속성에 접근시 점(<code>.</code>)을 이용해주세요.
```typescript
const obj: Option = {
  text: '드림인사이트',
  value: 'dreaminsight'
}

// Bad
console.log(obj['text'])

// Good
console.log(obj.text)
```

### 5.3. 변수로 접근 시에는 배열형으로 접근하세요.
> 별도의 interface 선언이 필요 합니다.
```typescript
interface KeyIndex {
  [index: string]: string
}

const obj: KeyIndex = {
  text: '드림인사이트',
  value: 'dreaminsight'
}

// Bad
const getText = (target): string => eval(`obj.${target}`)

// Good
const getText = (target): string => obj[target]
```

### 5.4. 객체 복사
* 객체를 복사하여 사용할 때에는 아래의 사항에 유의 하세요.
```vue
<script setup lang="ts">
import { reactive } from 'vue'

const obj = reactive<Option>({
  text: '드림인사이트',
  value: 'dreaminsight',
})

const checkData = (prm: string = ''): boolean => {
  let result = false
  const cp = obj

  if (prm === '') {
    obj.text = ''
  }

  if (cp.text === obj.text) {
    result = true
  }

  console.log(cp.text) // print ''

  return result
}

checkData()
</script>
```
* 위의 코드에서 <code>obj</code> 값을 복사하여 차후 비교 하기 위한 코드를 작성하였다고 가정 해보겠습니다.
* 하지만 중간에 <code>obj.text</code> 값을 변경하였고, 이후 <code>cp.text</code> 값을 확인 해보면 <code>''</code> 공백 값으로 변경된 것을 확인할 수 있습니다.
* 이것은 깊은 복사(Deep copy), 얕은 복사(Shallow copy)에 의하여 발생하는 현상입니다.
```typescript
const cp = JSON.parse(JSON.stringify(obj)) // it's okay
const cp = Object.assign({}, obj) // Good
const cp = { ...obj } // Best
```
* 위와 같이 object 깊은 복사(shallow copy)를 통해 데이터 참조의 고리를 끊을 수 있게 됩니다.

### 5.5. Property undefined
* 단축구문을 사용하는 경우 간혹 property가 undefined 상태 일수도 있습니다.
```json
// data.json
{
  "text1": "드림",
  "text2": "인사이트"
}
```
```typescript
import json from './data.json'

interface Text = {
  text1: string
  text2: string
  text3: string
}

const { text1, text2, text3 }: Text = json

axios.post('/some/url', {
  text1,
  text2,
  text3
})
```
* 위와 같은 상황에서 <code>text3</code>는 <code>undefined</code> 상태입니다.
* 해당 변수를 객체에 담아 서버에 전송할 경우 서버에서는 post 객체에서 <code>text3</code> 인자를 읽어 드리지 못 합니다.
* 이것은 흔하지는 않지만 Back-end에서 오류를 일으키는 요인이 됩니다.
* 데이터가 <code>undefined</code>가 될 확율이 있고, API 전송이 필요한 변수에 대해서는 필히 <code>undefined</code> 체크를 하시기 바랍니다.
```typescript
let { text1, text2, text3 }: Text = json

// 변수 존재 여부를 명확히 판단하기 위해 undefined 로 비교
if (text3 === undefined) {
  text3 = ''
}
```

:arrow_up: [목차](#목차)

---

## 6. 문자열
### 6.1. 문자열은 더블쿼트 <code>""</code>로 사용하지 않도록 합니다. 모든 문자열은 싱글쿼트로 <code>''</code> 처리 합니다.
```typescript
// Bad
const str: string = "드림인사이트 개발팀"

// Good
const str: string = '드림인사이트 개발팀'
```

### 6.2. 문자열 연결
* 문자열 연결 방법은 <code>String().concat()</code>, <code>+</code> 등이 있지만, 사용하지 않습니다.
```typescript
const company: string = '드림인사이트'
const team: string = '개발팀'

// Bad
const str1: string = company.concat(' ', team)    // '드림인사이트 개발팀'
const str2: string = company + ' ' + team         // '드림인사이트 개발팀'
```

* 템플릿 문자열 조합은 복잡한 문장을 만들때도 매우 편리 하며, 특히 가독성이 좋습니다.
```typescript
const gender: string = 'M'
const name: string = 'Julia'
const str: string = '당신의 성별은'
let result: string = ''

if (gender === 'F') {
  result = `${str} 여자이고, 이름은`
}

if (result === '') {
  result = `${str} 남자이고, 이름은 알 수 없습니다`
} else {
  result = `${result} ${name}입니다`
}
```

### 6.3. 문자열이 너무 길 경우, 템플릿 문자열을 활용하여 줄내림을 표현합니다.
```typescript
const str: string = `우리집강아지는 복슬 강아지,
학교갔다 돌아오면 멍멍멍,
꼬리치며 따라오며 멍멍멍`
```
> 다만 위와 같은 방식은 가독성이 떨어지기 때문에, 별도의 문자열 Library를 생성하여 사용하기를 권합니다.

:arrow_up: [목차](#목차)

---

## 7. 연산자
### 7.1. 비교 연산자
* 연산자는 정확힌 비교를 위하여 <code>===</code>, <code>!==</code>를 사용하세요.
* 문자형은 <code>''</code> 값을 제외한 모든 값을 <code>true</code>로 간주 됩니다.
```typescript
const apple: string = 'apple'
const banana: string = ''

// Bad
if (apple != banana) {
  ...
}

// Bad
if (banana == '') {
  ...
}

// Good
if (apple === banana) {
  ...
} else if (apple !== '') {
  ...
}
```
* 숫자형을 비교 하기 위해서는 해당 변수를 필히 Type Casting(Number, parseInt, parseFloat) 후 비교 해주세요.
> 비교 대상의 변수의 자료형을 알 수 없는 경우, 또는 API를 통해 받은 값
* 숫자형은 0 이외의 값을 모두 <code>true</code>로 간주 됩니다.
```typescript
const hour: number = 3
const min: string = '3'

// Bad
if (hour == min) {  // true
  ...
}

// Good
if (hour === Number(min)) {
  ...
}
```
> 정밀한 계산이 필요한 경우가 아닌경우 숫자형 캐스팅은 Number() 함수를 사용하세요.

* 배열로 선언된 변수는 <code>true</code>로 간주 됩니다. 비교 시에는 <code>Array.length</code>를 통해 값을 변화 여부를 확인 합니다.
```typescript
const ary: string[] = []

if (ary) // true

if (ary.length) // false
```

* 객체 선언시 빈 객체(<code>{}</code>)로 값을 할당하였을 경우 <code>true</code>로 간주 됩니다.
```typescript
const obj: object = {}

if (obj) // true
if (Object.keys(obj).length) // false
```

### 7.2. 논리 연산자 및 3항 연산자
```typescript
// 논리 연산을 통한 값 할당
const str: string = 'apple'

const apple: boolean | string = (str === 'apple') && true       // true
const banana: boolean | string = (str !== 'apple') && 'banana'  // false

const apple: boolean | string = (str !== 'apple') || 'banana'   // 'banana'
const banana: boolean | string = (str === 'apple') || false     // true

// 3항 연산
const apple: boolean = (str !== 'apple') ? true : false         // false
```

* <code>&&</code> 연산은 왼쪽항이 <code>true</code>일때 오른쪽 항의 값이 할당됩니다.
* <code>||</code> 연산은 왼쪽항이 <code>false</code>일때 오른쪽 항의 값이 할당됩니다.
* 3항 연산은 조건부가 <code>true</code> 일때 <code>:</code>기준 왼쪽값을 할당, <code>false</code>일때 오른쪽 값을 할당 됩니다.
* 중첩 3항 연산 사용은 지양합니다.
```typescript
const apple: boolean = false
const pineapple: boolean = true

// Bad (중첩 3항 연산)
let buyCount: number = apple ? 10 : pineapple ? 2 : 0

// Good
let buyCount: number = 0

if (apple) {
  buyCount = 10
} else if (pineapple) {
  buyCount = 2
}
```
> 중첩 3항 연산은 길이가 짧다고 하여도, 가독성이 매우 떨어집니다. 이는 익숙하지 않은 사람에게 더욱더 그렇습니다.

### 7.3. 너무 긴 연산문
* 연산문 자체가 길이가 긴 경우 또는 조건문 자체가 긴 경우, 해당 결과를 변수에 담아 표현하세요.
```typescript
let people: number = 10
let nowCovid: string[] = ['alpha', 'beta', 'gamma', 'delta', 'eta', 'lambda']
let hours: number = 18
let getVaccine: stirng[] = ['화이자', '모더나', '얀센', '노바백스', '스카이코비원']
let isSafe: boolean = false

// Bad
const isSafe: boolean = getVaccine.indexOf('화이자') > -1 || getVaccine.indexOf('모더나') > -1 || getVaccine.indexOf('얀센') > -1 ? true : false

// Good
const antibody: boolean = (getVaccine.indexOf('화이자') > -1 || getVaccine.indexOf('모더나') > -1 || getVaccine.indexOf('얀센')) > -1
const isSafe: boolean =  antibody ? true : false

// or
const pfizer: boolean = getVaccine.indexOf('화이자') > -1
const janssen: boolean = getVaccine.indexOf('얀센') > -1
const moderna: boolean = getVaccine.indexOf('모더나') > -1

const isSafe: boolean = (pfizer || janssen || moderna) ? true : false

// Bad
if (
  (nowCovid.indexOf('delta') > -1 || nowCovide.indexOf('lambda') > -1) &&
  (getVaccine.indexOf('화이자') > -1 || getVaccine.indexOf('모더나') > -1)) &&
  people > 4 &&
  hours > 16
) {
  isSafe = true
}

// Good
const covid: boolean = nowCovid.indexOf('delta') > -1 || nowCovide.indexOf('lambda') > -1
const vaccine: boolean = getVaccine.indexOf('화이자') > -1 || getVaccine.indexOf('모더나') > -1

if (covid && people > 4 && hours > 16 && vaccine) {
  isSafe = true
}
```

### 7.4. 변수, 인스턴스 타입확인
* 변수와 인스턴스 확인시 확실히 아래 사항을 확실히 구분하여 사용하세요.
```typescript
let text: string = 'dreaminsihgt'
let num: number = 0
let obj: Option = {
  text: '1',
  value: 1
}
const ary: number[] = [1, 2, 3, 4]
const func = (text: string, num: number): string => {
  return ...
}

// Good
if (typeof text === 'string')
if (typeof num === 'number')

// Good
if (typeof obj === 'object')
// Best
if (obj instanceof Object)

// Wrong
if (typeof ary === 'array') // ==> 'object'
if (ary instanceof Object)  // true

// Good
if (Array.isArray(ary))
// Best
if (ary instanceof Array)

// Good
if (typeof func === 'function')
// Best
if (func instanceof Function)
```

### 7.5. 객체 속성 확인
* 객체의 속성을 확인하기 위한 두가지 방법이 있다. <code>in</code>과 <code>Object.hasOwnProperty()</code>
* 이 두가지는 약간의 차이가 있지만, 사용자에 의해 작성된 property를 확인하는데 있어서는 별다른 차이가 없습니다.
```typescript
const ary: number[] = [1, 2, 3, 4]
const obj: Option = {
  text: '1',
  value: '2'
}

if (0 in ary) // true
if (4 in ary) // false
if ('length' in ary) // true
if ('text' in obj) // true
if ('hasOwnProperty' in obj) // true <--- 프로토타입 체인 확인

if (ary.hasOwnProperty(0)) // true
if (ary.hasOwnProperty(4)) // false
if (ary.hasOwnProperty('length')) // true
if (obj.hasOwnProperty('text')) // true
if (obj.hasOwnProperty('hasOwnProperty')) // false <--- 프로토타입 체인 확인
```
* 위와 같이 hasOwnProperty는 프로로타입 체인으로 상속된 속성에 접근 할수 없습니다.
* 두 가지의 차이점을 확실히 파악하고, 명확히 구분 가능한 부분에은 적극적으로 <code>in</code>을 사용하세요.

:arrow_up: [목차](#목차)

---

## 8. 블럭
### 8.1. 블럭이 필요한 모든 문법에서 블럭을 사용하세요. 람다식은 예외로 합니다.
```typescript
// Bad
const isOpenMarket = (isOpen: boolean): boolean => {
  if (isOpen) return true
  else return false
}

// Bad
const isOpenMarket = (isOpen: boolean): boolean => {
  if (isOpen) { return true }
  else { return false}
}

// Bad
function isOpenMarket(isOpen: boolean): boolean { return isOpen }

// Good
const isOpenMarket = (isOpen: boolean): boolean => {
  if (isOpen) {
    return true
  } else {
    return false
  }
}

// Good
const isOpenMarket = (isOpen: boolean): boolean => Boolean(isOpen)
```

### 8.2. <code>if</code> 와 <code>else</code> 사이의 블럭 연결 부분에서 개행 하지 않도록 합니다.
```typescript
// Bad
if (isOpen) {
  goMarket()
}
else {
  stayHome()
}

// Good
if (isOpen) {
  goMarket()
} else {
  stayHome()
}
```

### 8.3. 블럭이 종료된 후에는 반듯이 개행 해줍니다.
```typescript
// Bad
if (isOpen) {
  goMarket()
}
if (isCook) {
  goKitchen()
} else {
  return
}

// Good
if (isOpen) {
  goMarket()
}

if (isCook) {
  goKitchen()
} else {
  return
}
```

:arrow_up: [목차](#목차)

---

## 9. 반복문
### 9.1. 배열 및 객체 고급 함수
* 이터러블(<code>for-of</code>) 사용을 지양합니다.
```typescript
const numbers: number[] = [1, 2, 3, 4, 5]

// Bad
let sum: number = 0

for (let num of numbers) {
  sum += num
}

// Good
let sum: number = 0

numbers.forEach((num) => sum += num)

// Best
const sum = numbers.reduce((total, num) => total + num, 0)
```

* 특히 객체 속성 탐색시 이터러블이 종종 사용 됩니다.
```typescript
interface KeyIndex<T> {
  [index: string]: T
}

let values: (boolean | string)[] = []
let items: string[] = []
const obj: KeyIndex<T> = {
  text: '드림인사이트',
  value: 'dreamninsight',
  isOpen: true
}

// Bad
for (const [key, val] of Object.entries(obj)) {
  values.push(val)
}

// Bad
for (const key of Object.keys(obj)) {
  values.push(obj[key])
}

// Good
Object.entries(obj).map(([key, val]) => {
  values.push(key)
})

// Good
Object.keys(obj).map(key => {
  values.push(obj[key])
})
```
> <code>map()</code>, <code>forEach()</code>등 고급 함수를 사용하세요.

### 9.3. 중첩 Loop
* 우리는 JSON 데이터형식을 매우 많이 사용하고, 이것을 탐색하여 데이터를 가공하는 코드를 빈번하게 작성합니다.
```typescript
interface Item {
  text: string
  path?: string
  sub?: Item[]
}

const data: Item[] = [
  {
    text: "운영관리", sub: [
      {
        text: "기본정책", sub: [
          { text: "기본 정보 설정" },
          { text: "약관설정" },
          { text: "아이콘 노출 설정" },
          { text: "스크립트 관리" },
          { text: "단어 필터링" },
        ]
      },
      {
        text: "운영자 관리", path: "mng", sub: [
          { text: "운영자 리스트" },
        ]
      },
      {
        text: "분류 관리", path: "category", sub: [
          { text: "공통 분류 관리" }
        ]
      }
    ]
  },
  {
    text: "회원", sub: [
      {
        text: "회원 관리", sub: [
          { text: "회원 리스트" },
          { text: "휴면 회원관리" },
          { text: "회원 탈퇴" },
        ]
      },
      {
        text: "알림", sub: [
          { text: "알림 발송" },
          { text: "알림 발송 내역" },
        ]
      },
    ]
  }
]
```
* 위와 같이 복잡한 구조를 갖고 있는 JSON 데이터를 처리 할때 중첩 <code>for</code>문을 이용하게 됩니다.
```typescript
let doms: string = ''

for (let i = 0; i < data.length; i++) {
  doms += `<div>${data[i].text}`

  if ('sub' in data[i]) {
    let sub1 = data[i].sub

    for (let j = 0; j < sub1.length; j++) {
      doms += `<div>${sub1.text}`

      if ('sub' in sub1[j]) {
        let sub2 = sub1[j].sub

        for (let l = 0; l < sub2.length; l++) {
          doms += `<div>${sub2[l].text}</div>`
        }
      }

      doms += '</div>'
    }

    doms += '</div>'
  }

  doms += '</div>'
}
```
* <code>for</code>문을 포함한 모든 <code>loop</code>문은 중첩하게 되면 가독성이 매우 떨어지며, side effect 발생할 확율이 매우 높습니다.
* 이러한 문제를 해결하기 위해 <code>Recursion Function</code>을(재귀함수) 사용하기 권합니다.
```typescript
const makeDOM = (data: object = {}): string => {
  let doms: stirng[] = []

  if (Object.keys(data).length) {
    Object.entries(data).forEach(([, item]) => {
      if ('sub' in item) {
        let tag: string = `<div><span>${item.text}</span> ${makeMenu(item.sub).join('')}</div>`
        doms.push(tag)
      } else {
        doms.push(`<div><span>${item.text}</span></div>`)
      }
    })
  }

  return doms
}

const tags: string = makeDOM(data)
```
> 재귀 함수를 사용할 경우 무한 루프에 대한 부담은 줄어 들지만, 스택오버플로우(Stack Overflow)가 발생할 수 있습니다.<br>

:arrow_up: [목차](#목차)

---

## 10. 세미콜론
* 생략 합니다.
> webpack을 통해 빌드 될때 세미콜론은 자동으로 생성됩니다. 웹팩의 수고를 고맙게 생각합시다.
```typescript
const type: string = 'test'
let server: string = ''

// Bad
switch (type) {
  case 'development': server = '192.168.0.1'; break
  case 'test': server = '111.222.123.255'; break
  case 'production': server = '100.200.123.255'
}

// Good
switch (type) {
  case 'development':
    server = '192.168.0.1'
    break
  case 'test':
    server = '111.222.123.255'
    break
  case 'production':
    server = '100.200.123.255'
}

```
> 이것은 webpack을 통한 개발시에만 해당 됩니다. 혹여, 순수 js를 작성할 상황이 생긴다면 세미콜론을 사용해주세요.

:arrow_up: [목차](#목차)

---

## 11. 공백과 들여쓰기

### 11.1. 들여쓰기는 <code>Tab</code>이 아닌 <code>Space</code>로 정하고, 2칸으로 설정하세요.
```typescript
// Bad
if (isOpen) {
····  // do something
}

// Bad (Tab)
if (isOpen) {
→→→→  // do something
// or
→→    // do something
}

// Good
if (isOpen) {
··// do something
}
```

### 11.2. 연산자, 등호, 제어문, 콤마 뒤에는 공백으로 구분하세요.
```typescript
// Bad
const isOpen=true
const num=10
const ary=[1,2,3,4,5]
const obj={text:'text',value:10}

if(isOpen){
  num=num/2
}

for(let i=0;i<num;i++){
  if(num%2==0) num++
}

const test=()=>num


// Good
const isOpen = true
const num = 10
const ary = [1, 2, 3, 4, 5]
const obj = {
  text: 'text',
  value: 10
}

if (isOpen) {
  num = num / 2
}

for (let i = 0; i < num; i++) {
  if (num % 2 == 0) {
    num++
  }
}

const test = () => num
```

### 11.3. 괄호, 대괄호(배열) 안쪽 앞뒤로 공백을 삽입하지마세요.
```typescript
// Bad
const timeList = [ 0, 1, 2, 3, 4 ]

if ( isOpen ) {
  ...
}

const date = ( isOpen ) ? new Date() : false

const getTime = ( time ) => {
  return timeList[ time ]
}


// Good
const timeList = [0, 1, 2, 3, 4]

if (isOpen) {
  ...
}

const date = (isOpen) ? new Date() : false

const getTime = (time) => {
  return timeList[time]
}
```

### 11.4. 중괄호(<code>{}</code>) 안쪽 앞뒤로 공백을 삽입해주세요.
```typescript
// Bad
import {getDateTime} from 'datetime'

const {result, total} = json
const obj = {text: '', value: ''}

// Good
import { getDateTime } from 'datetime'

const { result, total } = json
const obj = { text: '', value: '' }
```

> 되도록이면 객체 선언시에는 중괄호를 블럭문처럼 사용하세요. 가독성이 좋아집니다.

* 이것은 템플릿 문법에도 적용됩니다.
```html
<template>
  <!-- Bad -->
  <div>{{text}}</div>

  <!-- Good -->
  <div>{{ text }}<div>
</template>
```

### 11.5. 메서드 체이닝
* 길게 나열되는 메서드 체이닝은 가독성이 떨어지는 경우가 종종 있습니다.
* 이러한 경우 내려쓰기와 들여쓰기로 정리해주세요.
```typescript
const obj = new classObject()

// Bad
obj.delay(10).setProperty({ text: 'text1', value: 1 }).send({ method: 'post', header: null }).then((result) => console.log(result))
obj.
  delay(10).
  setProperty({ text: 'text1', value: 1 }).
  send({ method: 'post', header: null }).
  then((result) => {
    console.log(result)
  })


// Good
obj.delay(10)
  .setProperty({ text: 'text1', value: 1 })
  .send({ method: 'post', header: null })
  .then(result => console.log(result))

obj
  .delay(10)
  .setProperty({
     text: 'text1',
     value: 1
  })
  .send({
    method: 'post',
    header: null
  })
  .then(result => {
    console.log(result)
  })
```
> 메서드 체이닝 내려쓰기 시에는 필히 연결자(<code>.</code>)을 앞쪽으로 배치해주세요.

:arrow_up: [목차](#목차)
---

## 12. 코멘트

### 12.1. 라인 코멘트는 필요한 라인 윗쪽에 표기 하세요.
```typescript
// Bad
let text1 = ref<string>('')      // 텍스트를 표시 합니다.

// Good
// 텍스트를 표시 합니다.
let text2 = ref<string>('')
```

### 12.2. 제어문
* 제어문에 대한 코멘트 작성시, 최상단에 표기하고, 제어 구분마다 표기 시에는 안쪽에 서술해주세요.
```typescript
// Bad
if (isOpen) {   // 마켓이 열려 있으면 사과와 바나나를 삽니다.
  apple += 1
  banana += 1
} else {        // 그렇지 않을 경우 편의점에가서 우유만 삽니다.
  milk += 1
}

// Good
// 마켓 오픈 여부에 따라 다른 상품을 구매 합니다.
if (isOpen) {
  // 열려 있을 경우 사과와 바나나를 삽니다.
  apple += 1
  banana += 1
} else {
  // 그렇지 않을 경우 편의점에가서 우유만 삽니다.
  milk += 1
}
```

### 12.3. 긴 코멘트가 필요한 경우 <code>/** */</code>로 기술합니다.
```typescript
// Bad
// 마켓이 열려 있으면 사과와 바나나를 사도록하고,
// 그렇지 않을 경우 편의점에 가서 우유를 삽니다.
// 만약 편의 점도 닫혀 있다면 집으로 돌아 옵니다.
const goMart = (isOpen: boolean): number => {
  // ...
  return total
}

// Good
/**
 * 마켓이 열려 있으면 사과와 바나나를 사도록하고,
 * 그렇지 않을 경우 편의점에 가서 우유를 삽니다.
 * 만약 편의 점도 닫혀 있다면 집으로 돌아 옵니다.
 *
 * @param isOpen true 라면 모든 구매 수량을 더하여 반환.
 * @return 구매한 총 수량을 반환
*/
const goMart = (isOpen: boolean): number => {
  // ...
  return total
}
```
> 함수의 경우 위와 같은 방식으로 전달인자 및 리턴값에 대해 기술 해주세요.

:arrow_up: [목차](#목차)

---

## 13. Vue 템플릿 문법

### 13.1. 테그는 길게 늘어 놓지 않습니다.
* 계층 구조에 맞도록 개행과 들여쓰기로 구분해주세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <ul>
      <li>text1</li><li>text2</li><li>text3</li>
    </ul>
    <table>
      <thead><tr><td>text1</td></tr></thead>
      <tbody>
        <tr><td><span>text2</span></td></tr>
        <tr><td>text3</td></tr>
      </tbody>
    </table>

    <!-- Good -->
    <ul>
      <li>text1</li>
      <li>text2</li>
      <li>text3</li>
    </ul>

    <table>
      <thead>
        <tr>
          <td>text1</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>text2</span>
          </td>
          <td>text3</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

### 13.2. 태그 싱글 톤과 닫기를 명확히 사용합니다.
```vue
<template>
  <div>
    <!-- Bad -->
    <div v-html="rawHtml" />
    <input type="button">

    <!-- Good -->
    <div v-html="rawHtml"></div>
    <input type="button" />
  </div>
</template>
```
> 닫기가 있는 태그는 필히 닫기를 해주고, 싱글 톤은 <code>< /></code>형태로 닫아 줍니다.

### 13.3. <code>v-bind, v-on</code> 디렉티브는 약어<code>:, @</code> 표기 하고, 동적 전달은 지양합니다.
```vue
<template>
  <div>
    <!-- Bad -->
    <a href="#" v-on:click.prevent="setText">눌러주세요</a>
    <CheckButton v-bind:items="data" />

    <!-- Good -->
    <a href="#" @click.prevent="setText">눌러주세요</a>
    <CheckButton :items="data" />

    <!-- not use -->
    <CheckButton :[prop]="whatToDo" @[event]="action" />
  </div>
</template>
```
> 동적 전달을 사용할 경우 코드가 불분명해지고, 가독성이 떨어집니다.

### 13.4. 조건부 랜더링 구현시에는 의미 없는 태그 사용을 자제하세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div v-if="number == 1">
      <span>1번 입구로 가세요.</span>
    </div>
    <div v-else-if="number === 2">
      <span>2번 입구로 가세요.</span>
    </div>
    <div v-else-if="number === 3">
      <span>3번 입구로 가세요.</span>
    </div>
    <div v-else>
      <span>입장이 불가합니다.</span>
    </div>

    <!-- Good -->
    <span v-if="number === 1">1번 입구로 가세요.</span>
    <span v-else-if="number === 2">2번 입구로 가세요.</span>
    <span v-else-if="number === 3">3번 입구로 가세요.</span>
    <span v-else>입장이 불가합니다.</span>
  </div>
</template>
```


### 13.5. <code>v-for</code>와 <code>v-if</code>를 같은 테그에 함께 사용하지 마세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div :key="item" v-for="item in list" v-if="item % 2 === 0">
      {{ item }}
    </div>

    <!-- Good -->
    <template :key="item" v-for="item in list">
      <div v-if="item % 2 === 0">{{ item }}</div>
    </template>
  </div>
</template>
```

### 13.6. 속성(Attribute) 및 디렉티브 나열 순서를 지켜 주세요. 나열되는 종류가 많을 경우 개행 및 들여쓰기로 구분해주세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div id="Mart" v-if="isOpen" :class="{ disabled: isSunday }" @click="checkItOut">{{ letsGo }}</div>

    <!-- Good -->
    <div
      id="Mart"
      :class="{ disabled: isSunday }"
      @click="checkItOut"
      v-if="isOpen" >
      {{ letsGo }}
    </div>
  </div>
</template>
```
> 디렉티브 나열 순서: 일반 bind -> 변수(숫자) bind(:) -> 이벤트(@) -> v-html -> v-model -> v-for -> v-if

### 13.7. 같은 속성을 중복하여 사용하지 마세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <div class="default" :class="{ isActive: active }" v-html="html"></div>

    <!-- Good -->
    <div :class="['default', { isActive: active }]" v-html="html"></div>
  </div>
</template>
```

### 13.8. 템플릿 안에 복잡한 수식 사용은 지양합니다.
```vue
<script setup lang="ts">
import { ref } from 'vue'

const numbers: number[] = [1, 2, 3, 4, 5, 6]

const getCalculate = (): number => {
  return num + (num / 100 * 10)
}
</script>

<template>
  <div>
    <!-- Bad -->
    <div v-for="num in numbers">
      {{ num + (num / 100 * 10) }}
    </div>

    <!-- Good -->
    <div v-for="num in numbers">
      {{ getCalculate(num) }}
    </div>
  </div>
</template>
```
> 수식이 template 안에 들어가게 되면 코드 가독성이 매우 떨어집니다.


:arrow_up: [목차](#목차)

---

## 14. 컴포넌트 SFC (Single File Component)

### 14.1. 컴포넌트 명명
* 컴포넌트 template 배치시에 파스칼케이스(Pascal-Case)로 구분 합니다.
```vue
<script setup lang="ts">
// Bad
import check_button from '@/components/checkButton'
import checkButton from '@/components/checkButton'

// Good
import CheckButton from '@/components/checkButton'
</script>

<template>
  <div>
    <!-- Bad -->
    <check_button />
    <check-button />

    <!-- Good -->
    <CheckButton />
  </div>
</template>
```

### 14.2. Props 정의
* Props 속성에 대한 자료형을 지정하고, 기본값이 필요한경우 <code>withDefaults()</code>로 처리 하세요.
```vue
<script setup lang="ts">
import { withDefaults } from 'vue'

interface Props {
  modelValue: number | string
  mexLenght?: number
  title: string
  isHide: boolean
  items?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '기본 Text',
  isHide: false,
})
</script>
```

> 좀 더 자세항 내용은 링크를 참조 하세요. [Props 유효성 검사](https://v3.ko.vuejs.org/guide/component-props.html#prop-%E1%84%8B%E1%85%B2%E1%84%92%E1%85%AD%E1%84%89%E1%85%A5%E1%86%BC-%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A1)

* template 배치시 props명은 케밥캐이스로 정의 하고, 각 props 자료형에 맞춰 설정하세요.
```vue
<template>
  <div>
    <!-- Bad -->
    <ComponentA
      maxLength="10"
      :is-hide="true"
      :title="'사과 좋아요!'"
      :items="list"
      v-model="apple"
    />

    <!-- Good -->
    <ComponentA
      is-hide
      title="사과 좋아요!"
      :max-length="10"
      :items="list"
      v-model="apple"
    />
  </div>
</template>
```

### 14.3. emit 정의
* <code>getCurrentInstance()</code>를 통해 emit 처리 하지 않도록 합니다.
* 발생 가능한 이벤트를 모두 정의해주세요.
```vue
<script setup lang="ts">
import { defineEmits, getCurrentInstance } from 'vue'

// Bad
const instance = getCurrentInstance()
instance.emit('click', 'event')

// Bad
const emit = defineEmits()

// Good
interface Emits {
  (event: 'click'): void
  (event: 'mouseover'): void
  (event: 'change-code', value: string): void
}

const emit = defineEmits<Emits>()

emit('change-code', 'code')
</script>
```
> <code>emit = defineEmits()</code>과 같이 이벤트를 정의 하지 않아도 이벤트를 발생 시킬 수 있습니다. <br>
하지만 관리차원에서 항상 이벤트를 정의 해주세요.
> 만약 컴포넌트에서 <code>update:modelValue</code> 말고는 정의되는 이벤트가 없는 경우 <br>
<code>emit = defineEmits()</code>가 가능합니다.

### 14.4. v-model
*  Props의 데이터는 단방향입니다. 컴포넌트간 데이터를 주고 받아야 한다면, v-model로 연결 하세요.
```vue
<script setup lang="ts">
import { ref } from

const props = defineProps<{
  modelValue: string
  text?: string,
}>()

const emit = defineEmits<{
  (event: 'click'): void
}>()

let val = ref<string>('')

const updateValue = (event: KeyEvent): void => {
  const target = event.target as HTMLInputElement

  // 정상적인 model 연결을 통한 양방한 바인딩
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <!-- Bad -->
    <input
      type="text"
      v-model="val"
    />

    <!-- Good -->
    <input
      type="text"
      :value="val"
      @input="updateValue"
    />
  </div>
</template>
```

### 14.5. defineExpos
* Vue3 에서 컴포넌트는 폐쇄형입니다.
* 컴포넌트의 API 함수를 통한 처리를 가능하게 하고자 한다면 <code>defineExpose()</code>를 통해 개방 시켜 주세요.
```vue
<script setup lang="ts">
// component a
import { ref, reactive } from 'vue'

let text = ref<string>('')

const state = reactive<State>({
  name: 'state',
  type: 'reactive',
  isOpen: false,
})

const check = (): void => {
  console.log('checking...')
}

defineExpose({
  text,
  check
})
</script>
```

```vue
<script setup lang="ts">
import ComponentA from './componentA'
import type { ComponentA } from './componentA/types'

import { ref } from 'vue'

const comp = ref<ComponentA>()

// Bad
console.log(comp.value?.state.name) // undefined

// Good
console.log(comp.value?.text)
console.log(comp.value?.check())
</script>

<template>
  <ComponentA ref="comp" />
</template>
```
:arrow_up: [목차](#목차)

---

## 15. 이벤트 버스

### 15.1. 사용하지 않습니다.
* Event Bus 란? [보기](https://github.com/dream-insight/vue3#16-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EC%8A%A4)
* <code>mitt</code>라는 Event bus로 사용할 수 있는 라이브러리가 있지만, 역시 사용하지 않습니다.
* 참조: [보기](https://github.com/developit/mitt)

:arrow_up: [목차](#목차)

---

## 16. Provide & Inject

### 16.1. 철저한 관리필요
* 복잡한 컴포넌트 구조에서 Provide와 Inject는 편하게 자식 컨포넌트와 소통이 가능합니다.
<img src="https://vuejs.org/assets/provide-inject.3e0505e4.png" />

```vue
<script setup lang="ts">
// parent
import Child from '@/components/child'
import { ref, provide } from 'vue'

let count = ref<number>(0)

const increase = (flag = '+') => {
  if (flag === '-') {
    count.value--
  } else {
    count.value++
  }
}

provide('count', count)
provide('increase', increase)
</script>

<template>
  <p>
    <Child />
  </p>
  <p>
    <button type="button" @click="increase('-')">count 감소</button>
  </p>
</template>
```

```vue
<script setup lang="ts">
// child.vue
import { inject } from 'vue'

const count = inject('count') as number
const increase = inject('increase') as Function
</script>

<template>
  <p>{{ count }}</p>
  <p><button type="button" @click="increase">count 증가</button></p>
</template>
```
* 위와 같이 부모 컴포넌트의 변수 또는 함수 등을 공유 할 수 있고, 변이 감지도 손쉽게 처리할 수 있습니다.
* 엑세스 흐름을 파악하기 어려울 경우 사용에 주의 하세요.

### 16.2. 되도록 상태관리자(Vuex) 사용하세요.
* 상태관리자를 통하여 변수를 변이하고, 해당 변수를 컴포넌트에서 호출 하여 사용하세요.
```typescript
// store.js
export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    mutIncrease(state, v) {
      state.count = v
    }
  },
  actions: {
    setIncrease({ state, commit }, flag) {
      const count = (flag == '+') ? state.count + 1 : state.count - 1

      commit('mutIncrease', count)
    }
  },
  getters: {
    getCount(state) {
      return state.count
    }
  }
})
```

```vue
<script setup lang="ts">
// home.vue
import { useStore } from 'vuex'
import Child from './Child'

const store = useStore()

const increase = () => {
  store.dispatch('setIncrease', '-')
}
</script>

<template>
  <Child />

  <p>
    <button type="button" @click="increase">count 감소</button>
  </p>
</template>

<script setup lang="ts">
// Child.vue
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.state.count)

const increase = () => {
  store.dispatch('setIncrease', '+')
}
</script>

<template>
  <p>{{ count }}</p>
  <p>
    <button type="button" @click="increase">count 증가</button>
  </p>
</template>
```
* 값에 대한 변이 뿐만 아니라, 약간 방식만 다르게 하여 이벤트 감지와도 비슷하게 사용 할 수 있습니다.
```typescript
// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    event: '',
  },
  mutations: {
    mutEvent(state, v) {
      state.event = v
    }
  },
  actions: {
    setEvent({ commit }, flag = '') {
      commit('mutEvent', flag)
    }
  },
  getters: {
    getEvent(state) {
      return state.event
    }
  }
})
```

```vue
<script setup lang="ts">
// home.vue
import Child from '@/components/child'

import { useStore } from 'vuex'

const store = useStore()

const increase = (): void => {
  store.dispatch('setEvent', 'minus')
}
</script>

<template>
  <Child />
  <p>
    <button type="button" @click="increase">count 감소</button>
  </p>
</template>
```

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const event = computed<string>(() => store.getters.getEvent)

let count = ref<number>(0)

watch(event, (v) => {
  if (v) {
    count.value = (v === 'plus') ? count.value + 1 : count.value - 1
    store.dispatch('setEvent')
  }
})

const increase = (): void => {
  store.dispatch('setEvent', 'plus')
}
</script>

<template>
  <p>{{ count }}</p>
  <p><button type="button" @click="increase">count 증가</button></p>
</template>
```
* 위와 같이 <code>store</code>에 지정된 변수를 참조하여 <code>watch</code>를 통한 변이를 감지 하여 특정 액션을 취할 수 있습니다.


:arrow_up: [목차](#목차)

---


## 17. 상태 관리자 Vuex
### 17.1. 기능별 모듈 분리를 기본으로 합니다.
* 분류가 모호한 코드는 store/index.js에 나열하고 코멘트 처리 해줍니다.
```typescript
// index.js
import session from '@/store/modules/session.js'
import board from '@/store/modules/board.js'

const store = new Vuex.Store({
  modules: {
    session,
    board,
  },
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
})
```

### 17.2. mutations, actions, getters
* 기본 명명 규칙을 준수하여 작성해주세요.
* mutations -> mut, actions -> set, getters -> is(Boolean), get 으로 명명합니다.
```typescript
const session = {
  namespaced: true,
  state: {
    user: {
      token: '',
      id: '',
      name: '',
    },
    loginTime: '',
  },
  mutations: {
    mutSession(state, payload) {
      // do something
    },
    mutLogout(state, payload) {
      // do somthing
    }
  },
  actions: {
    setLogin({ commit }, payload) {
      const { token, id, name } = payload
      commit('mutSession', { token, id, name })
      // do something
    },
    setLogout({ commit }, payload) {
      // do somthing
    }
  },
  getters: {
    isLogin(state) {
      if (state.user.token) {
        return true
      }

      return false
    },
    getUserName(state) {
      return state.user.name
    }
  }
}
```

:arrow_up: [목차](#목차)

---

## 18. 라우터 Router
* 이름은 경로와 일치 시키되 앞쪽 <code>/</code>는 사용하지 않습니다.
* 별도의 import로 파일을 불러 오지 않고 <code>component</code> 옵션에 바로 <code>() => import()</code> 방식으로 매칭 시켜 줍니다.
* <code>meta</code> 옵션은 필요한 부분에만 작성하여 주고, 그외에는 설정하지 않습니다.
```typescript
// Bad
import boardList from '@/views/board/list'
import boardDetail from '@/views/board/detail'
import boardComment from '@/views/board/comment'
import boardWrite from '@/views/board/write'

const routes = [
  { path: '/', name: 'index', component: () => import('@/views/index') },

  // Bad
  {
    path: '/board/list', name: 'board/list', component: boardList, children: [
      { path: '/board/detail', name: 'board/detail', component: boardDetail },
      { path: '/board/comment', name: 'board/comment', component: boardComment },
    ]
  },
  { path:  '/board/write', name: 'board/write', component: boardWrite },

  // Good
  {
    path: '/board/list',          name: 'board/list',       component: () => import('...'),
    children: [
      { path: '/board/detail',    name: 'board/detail',     component: () => import('...') },
      { path: '/board/comment',   name: 'board/comment',    component: () => import('...') },
    ]
  },
  { path: '/board/write',         name: 'board/write',      component: () => import('...') },

  {
    path: '/member/detail',       name: 'member/detail',    component: () => import('...'),
    meta: { pullScreen: true }, children: [
      { path: '/member/detail/password', name: 'member/detail/password', component: () => import('...') },
    ]
  },
]
```


:arrow_up: [목차](#목차)

---

## 19. env 파일 활용

### 19.1. 개발, 테스트, 서비스 구분
* 루트 폴더에 아래와 같이 파일을 배치 합니다.
```
.env
.env.dev
.env.test
.env.prod
```
* package.json 파일 script 명령어에 --development 나 --production을 직접 주입방식은 사용하지 않습니다.
* 명령어 별로 해당 파일을 직접 복사해 넣는 방식으로 설정합니다.
```json
{
  "script": {
    "serve": "cp ./.env.dev ./.env && vue-cli-service serve",
    "build:dev": "cp ./.env.dev ./.env && vue-cli-service build",
    "build:test": "cp ./.env.test ./.env && vue-cli-service build",
    "build:prod": "cp ./.env.prod ./.env && vue-cli-service build",
  }
}
```

### 19.2. 사용 방법
* 각종 환경 변수를 선언 하여 사용합니다.
* 환경 변수 선언시에 VUE_APP_* 형태로 작성하여야 합니다.
```
VUE_APP_VERSION = 1.2.1
VUE_APP_OAUTH_KEY = cdf55f3392d0f1be3dd12a9673469938ada5c2a
VUE_APP_API_URL = https://dev.programrush.co.kr/api
```
* vue에서 호출하여 사용시에는 <code>process.env</code>로 접근 가능합니다.
```typescript
const { VUE_APP_VERSION, VUE_APP_API_URL } = process.env
```

### 19.3. 주의 사항
* 로컬 개발 진행 시에 .env 파일을 수정 하였다면 반듯이 로컬 서버를 재시작 해주세요.
* 배포시에는 빌드 당시 설정된 내용이 적용 됩니다. 설정이 변경된 내용은 꼭 다시 빌드 후 배포하세요.


:arrow_up: [목차](#목차)

---

# TypeScript

## 1. 명명 방식
* interface, type 명명은 파스칼 케이스를 기본으로 합니다.
```typescript
interface OptionItem {
  text: string
  value: string
}

type DateString = string
type ItemGroup = 'text' | 'value' | 'empty'
```

:arrow_up: [목차](#TypeScript-목차)

---

## 2. import
* 타입을 <code>import</code> 할 시에는 일반 모듈과 구분하기 위하여 type 키워드를 사용 하세요.
```typescript
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { route } from 'vue-router'
import type { RouteRecord } from 'vue-router'
```

:arrow_up: [목차](#TypeScript-목차)

---

## 3. 유형별 정의 방식

### 3.1. 변수 및 배열
* 되도록 <code>any</code> 타입은 피하고, 여러 타입이 적용될 가능성이 있는 형식은 별도의 <code>type</code>으로 정의 하여 사용합니다.
```typescript
let text: string = ''
let num: number = 0
let bool: boolean = false
const ary: string[] = []

// Bad
let common: any = ''

// Good
type Common = string | number | boolean | object
let common: Common = ''

const common: Common[] = []

// or

// 이것도 괜찮지만 너무 길군요.
const common: (string | number | boolean | object)[] = []
```
### 3.2. 함수
* 함수의 인자의 자료형과, 반환형을 정확히 지정합니다.
* <code>interface</code>를 통해 깔끔하게 표현하는 것도 좋습니다.
```typescript
const func = (text: string, value: number): string => {
  return `${text}, ${value}`
}

// Good
interface Func {
  (text: string, value?: number): string
}

// 별칭을 사용한 선언도 가능하지만 별칭의 본질에 맞게 사용을 지양합니다.
// type Func = (text: string, value?: number) => string

const func: Func = (text, value) => {
  return `${text}, ${value}`
}
```

### 3.3. 객체
* <code>object</code> 및 <code>class</code>등에 적용할 수 있습니다.
```typescript
// 일반 객체
interface Option {
  text: string
  value: string
}

const obj: Option = {
  text: '드림인사이트',
  value: 'dreaminsight'
}

// class
interface Person {
  name: string
  age: number
  getName(first: string): string
}

class person implements Person {
  name: string = ''
  age: number = 0
  #medison: string

  getName(first: string): string {
    return `${first} ${this.name}`
  }
}

const clsPerson: Person = new person()
```

* 초기 값이 필요 없고, 엑세스 중간에 속성값을 지정해야 하는 경우가 생길수도 있습니다.
```typescript
interface Option {
  text: string
  value: string
  index: number
}

const obj = {} as Option

obj.text = '사람'
obj.value = 'person'
```
> 단, 위와 같은 경우는 속성에 옵셔널 설정이 되어 있지 않아도, 속성값 설정없이 사용이 가능합니다.<br>
프로세스 과정에서 해당 속성에 값이 할당되어 있는지 여부를 판단하지 않는다면, 여러 문제가 발생할 수 있습니다.<br>
되도록 초기 값을 지정하여 안전하게 객체를 사용하길 권합니다.

* 처리중 간혹 객체의 속성을 배열형태로 호출하여 참조 해야 하거나, 정의되지 않은 속성을 추가 해야 하는 경우가 있습니다.
```typescript
const obj: Option = {
  text: '사람',
  value: 'person'
}

let property: string = 'text'

let text: string = obj[property]
                       ^^^^^^^^ 오류 발생

obj.index = 0
^^^^^^^^^ 오류 발생
```
* 위와 같은 상황에서 발생하는 오류에 대해서 아래와 같이 해결할 수 있습니다.
```typescript
interface KeyIndex {
  [index: string]: string
}

// 필수 속성이 지정된 인터패이스 확장
interface Option extends KeyIndex {
  text: string
  value: string
}

const obj: Option = {
  text: '사람',
  value: 'person',
  option: 'male'
}
```
> 물론, <code>obj: KeyIndex</code>와 같은 방식으로도 사용가능합니다. 하지만 필수 속성에 대한 보장은 받을 수 없습니다.

### 3.4. 제네릭
* Vue에서 제공되는 제네릭 함수의 경우 type을 import 배제 하기 위해 아래와 같이 사용합니다.
```typescript
// Bad
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

let name: Ref<string> = ref('드림인사이트')
const status: ComputedRef<boolean> = computed(() => bar === foo)

// Good
import { ref, computed } from 'vue'

let name = ref<string>('드림인사이트')
const status = computed<boolean>(() => bar === foo)
```

* DOM 또는 Component 참조 선언시에는 정확한 타입을 지정해주세요.
```typescript
// Bad
const div = ref<HTMLElement>()
const input = ref<HTMLElement>()

// Good
const div = ref<HTMLDivElement>()
const input = ref<HTMLInputElement>()

import { inject } from 'vue'
import type { Toast } from '@/components/Toast/types'

const Toast = inject('Toast') as Toast
```

:arrow_up: [목차](#TypeScript-목차)

---

## 4. Props, Emits 정의
* <code>Props, Emits</code>의 <code>interface</code> 정의시 유의 해야할 점이 있습니다.
* 일반적으로 type 정의된 내용을 파일로 분리하여 <code>export</code> 하는 방식으로 많이 사용됩니다.
```typescript
// types.ts
export interface Props {
  text: string
  title?: string
  use?: boolean
}

export interface Emits {
  (event: 'user-event', value: string): void
  (event: 'refresh'): void
}


// ex.vue
import { ref } from 'vue'
import type { Props, Emits } from './types'

const props = defineProps<Props>()
                          ^^^^^ 오류 발생
const emits = defineEmits<Emits>()
                          ^^^^^ 오류 발생
```

* 하지만 위와 같이 사용하게 되면 Typescript 오류가 발생합니다.
> vuejs.org에서 말하는 이유는 다음과 같습니다.<br>
*이는 Vue 구성 요소가 분리되어 컴파일되고 컴파일러가 소스 유형을 분석하기 위해 가져온 파일을 탐색하지 않기 때문입니다.<br> 이 제한은 향후 릴리스에서 제거될 수 있습니다.*

* 위와 같은 이유로 Props, Emits 정의는 아래 와 같이 적용해야 합니다.
```typescript
import { ref } from 'vue'

export interface Props {
  text: string
  title?: string
  use?: boolean
}

export interface Emits {
  (event: 'user-event', value: string): void
  (event: 'refresh'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

// export가 필요 없는 경우
const props = defineProps<{
  text: string
  title?: string
  use?: boolean
}>()
const emits = defineEmits<{
  (event: 'user-event', value: string): void
  (event: 'refresh'): void
}>()
```

:arrow_up: [목차](#TypeScript-목차)

---

## 5. ENUM
* 많은 사람들이 현제 Typescript의 ENUM은 여러 문제가 있고 성능상 좋지 않다고 평가 합니다.

### 5.1. Original Enum
```typescript
enum Direction {
  UP = 0,
  LEFT,
  RIGHT,
  DOWN
}

const where: Direction = Direction.RIGHT   // 2

enum Direction {
  U = 'UP',
  L = 'LEFT',
  R = 'RIGHT',
  D = 'DOWN'
}

const where: Direction = Direction.R     // RIGHT
```
* 일반적으로 사용 가능한 <code>enum</code>은 위와 같이지만 사용하지 않도록 합니다.
* 해당 문제에 대해서는 이 [링크](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/)를 참조하세요.

### 5.2. Union Type (Enum 대체)
```typescript
const direction = {
  UP: 0,
  LEFT: 1,
  RIGHT: 2,
  DOWN: 3
} as const

type Direction = typeof direction[keyof typeof direction]

const where: Direction = direction.RIGHT   // 2

const Direction = {
  U: 'UP',
  L: 'LEFT',
  R: 'RIGHT',
  D: 'DOWN'
} as const

type Direction = typeof direction[keyof typeof direction]

const where: Direction = direction.R     // RIGHT
```

:arrow_up: [목차](#TypeScript-목차)

---
### UPDATE HISTORY

* 초안 작성 - 2022.10.07 (작성자: 김종윤 수석매니저)
* 항목 6.5 추가작성 - 2022.10.18 (작성자: 김종윤 수석매니저)
* 항목 4, 항목 5 합병 모든 함수 형태는 화살표 함수로 적용 - 2022.11.09 (작성자: 김종윤 수석매니저)
* 컴포넌트 표기 오류 수정 - 2022.12.12 (수정자: 김종윤 수석매니저)
* Typescript 및 일부 항목 추가 - 2023.03.08 (작성자: 김종윤 수석매니저)