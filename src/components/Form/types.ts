export interface KeyIndex<T> {
  [index: string]: T
}

export interface RuleFunc {
  (v: any): string | boolean
}

// validate rule type
export interface Rules {
  [index: string]: RuleFunc[]
}

// selectbox, checkbox 사용 옵션
export interface OptionItem {
  text: string
  value: number | string
}

export interface OptionItemGroup {
  [index: string]: OptionItem[]
}