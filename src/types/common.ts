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
