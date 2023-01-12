export interface toggleButtonType {
  text: string
  checked: boolean
}

export interface showRange {
  [index: string]: boolean
}

export interface transitionNameType {
  [index: string]: string
}

export interface timeoutType {
  [index: string]: ReturnType<typeof setTimeout> | undefined
}

export interface dateCellType {
  day: number
  type: string
}

export interface dateRenderType {
  [index: string]: Array<dateCellType[]>
}

interface dateStateValueType {
  [index: string]: number
}

export interface dateStateType {
  [index: string]: dateStateValueType
}

export interface dateOptionType {
  year: number[]
  month: number[]
}

interface selectedDateValueType {
  date: string
  day: number
}

export interface selectedDateType {
  [index: string]: selectedDateValueType
}

export interface timeStateType {
  start: number
  end: number
}

export {}

declare global {
  interface Date {
    getDateFormat(format: string, days: number): string
  }
}