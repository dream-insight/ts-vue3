import '@/types/prototype'
import { RegExpCase } from '@/types/common'

/**
 * 개행 문자를 br로 변경
 */
String.prototype.nl2br = function (): string {
  if (this.trim().length) {
    return this.trim().replace(/\n/g, "<br>")
  }

  return ''
}

/**
 * 문자열의 패턴 체크
 */
String.prototype.patternCheck = function (flag: string): boolean {
  const patternCase: RegExpCase = {
    eng: /^[a-z|A-Z]+$/,
    // 영문, 숫자 유효성 검사
    engnum: /^[(a-z|A-Z)0-9]+$/,
    // 한글, 영문, 숫자 유효성 검사
    hanengnum: /^[(ㄱ-ㅎ|ㅏ-ㅣ|가-힣)(a-z|A-Z)0-9]+$/,
    // 아이디 영문,숫자,underbar(_) 사용 유효성 검사
    id: /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/,
    // 정수 유효성 검사
    num: /^[0-9]+$/,
    // 영문,숫자 혼합사용 유효성 검사
    wordnum: /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/,
    // 이메일 유효성 검사
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  }

  return (patternCase[flag]) ? patternCase[flag].test(String(this)) : false
}

/**
 * 핸드폰 번호 대쉬 삽입 처리
 */
String.prototype.phoneNumber = function() {
  return this.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3')
}

/**
 * 사업자등록번호 포멧
 */
String.prototype.companySerial = function() {
  return this.replace(/^(\d{3})(\d{2})(\d{5})$/, '$1-$2-$3')
}

/**
 * 숫자 1000 단위로 콤마 추가
 */
String.prototype.numberFormat = function (): string {
  return new Intl.NumberFormat().format(Number(this))
}

Number.prototype.numberFormat = function (): string {
  return new Intl.NumberFormat().format(Number(this))
}

/**
 * 파일 단위로 리턴
 */
Number.prototype.fileSize = function (): string {
  const x = Number(this)

  if (x > 0) {
    const s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    const e = Math.floor(Math.log(x) / Math.log(1024))

    return (x / Math.pow(1024, e)).toFixed(2) + ' ' + s[e]
  }

  return '0'
}

String.prototype.fileSize = function (): string {
  let num = Number(this)
  return num.fileSize()
}