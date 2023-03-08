// 목록 최상단 라벨링 Array:[{text: String, width: Number, sort: Boolean, target: String(sort target)}] *
export interface TableHeader {
  text: string
  width?: number | string
  align?: string
  sort?: boolean
  target?: string
  order?: string
  colspan?: number
  rowspan?: number
}

interface KeyIndex<T> {
  [index: string]: T
}

export interface TableFooter extends KeyIndex<any> {}

// 테이블 목록 Array:[] *
export interface TableItems extends KeyIndex<any> {}

export interface SortingChangeData {
  data: TableItems[]
  target: string
  order: string
}