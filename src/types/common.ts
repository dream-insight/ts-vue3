/**
 * 해당 type 들은 공통 컴포넌트 타입과 비슷한 것들이 있지만
 * 별개의 type으로 인지하고 사용 하도록 합니다.
 *
 * 김종윤 수석매니저
 */

// string 또는 number object
export interface KeyIndex<T> {
  [index: string]: T
}

export interface Options {
  text: string
  value: any
}

export interface OptionGroup {
  [index: string]: Options[]
}

export interface RegExpCase extends KeyIndex<RegExp> {}
