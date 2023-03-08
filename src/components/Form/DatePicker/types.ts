export interface ToggleButtonType {
  text: string
  checked: boolean
}

export interface ShowRange {
  [index: string]: boolean
}

export interface TransitionNameType {
  [index: string]: string
}

export interface TimeoutType {
  [index: string]: number
}

export interface DateCellType {
  day: number
  type: string
}

export interface DateRenderType {
  [index: string]: Array<DateCellType[]>
}

interface DateStateValueType {
  [index: string]: number
}

export interface DateStateType {
  [index: string]: DateStateValueType
}

export interface DateOptionType {
  year: number[]
  month: number[]
}

export interface SelectedDateValueType {
  date: string
  day: number
}

export interface SelectedDateType {
  [index: string]: SelectedDateValueType
}

export interface TimeStateType {
  start: number
  end: number
}

declare global {
  interface Date {
    getDateFormat(format: string, days: number): string
  }
}