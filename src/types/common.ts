// string 또는 number object
export interface StringIndex<T> {
  [index: string]: T
}

export interface RegExpCase {
  [index: string]: RegExp
}