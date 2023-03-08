export type RuleFunction = (v: any) => string | boolean

// validate rule type
export interface Rules {
  [index: string]: RuleFunction[]
}

// selectbox, checkbox 사용 옵션
export interface OptionItem {
  text: string
  value: any
}

export interface OptionItemGroup {
  [index: string]: OptionItem[]
}