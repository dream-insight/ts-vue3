export const tableCellAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const

export type TableCellAlign = typeof tableCellAlign[keyof typeof tableCellAlign]

export const footerItemTag = {
  td: 'td',
  th: 'th'
} as const

export type FooterItemTag = typeof footerItemTag[keyof typeof footerItemTag]


// 목록 최상단 라벨링 Array:[{text: String, width: Number, sort: Boolean, target: String(sort target)}] *
export interface TableHeader {
  text: string
  width?: number | string
  align?: TableCellAlign
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
export interface TableListItem extends KeyIndex {}

export interface TableFooter {
  colspan?: number
  align?: TableCellAlign
  tag?: FooterItemTag
  value: FooterItemTag
}

export interface SortingChangeData {
  data: TableListItem[]
  target: string
  order: string
}
