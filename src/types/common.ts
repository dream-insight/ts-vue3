// string 또는 number object
export interface KeyIndex<T> {
  [index: string]: T
}

export interface RegExpCase extends KeyIndex<RegExp> {}