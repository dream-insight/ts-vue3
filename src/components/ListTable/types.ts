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

interface KeyIndex {
  [index: string]: any
}

type FootAlign = 'center' | 'left' | 'right'
type FootItemTag = 'td' | 'th'

export interface TableFooter {
  colspan?: number
  align?: FootAlign
  tag?: string
  value: FootItemTag
}

// 테이블 목록 Array:[] *
export interface TableItems extends KeyIndex {}

export interface SortingChangeData {
  data: TableItems[]
  target: string
  order: string
}