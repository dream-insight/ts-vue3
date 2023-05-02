export const listTableCellAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const

export type ListTableCellAlign = typeof listTableCellAlign[keyof typeof listTableCellAlign]

export const footerItemTag = {
  td: 'td',
  th: 'th'
} as const

export type ListTableFooterItemTag = typeof footerItemTag[keyof typeof footerItemTag]


// 목록 최상단 라벨링 Array:[{text: String, width: Number, sort: Boolean, target: String(sort target)}] *
export interface ListTableHeader {
  text: string
  width?: number | string
  align?: ListTableCellAlign
  sort?: boolean
  target?: string
  order?: string
  colspan?: number
  rowspan?: number
}

interface KeyIndex {
  [index: string]: any
}

// 테이블 목록 Array:[] *
export interface ListTableItem extends KeyIndex {}

export interface ListTableFooter {
  colspan?: number
  align?: ListTableCellAlign
  tag?: ListTableFooterItemTag
  text: any
}

export interface SortingChangeData {
  data: ListTableItem[]
  target: string
  order: string
}
