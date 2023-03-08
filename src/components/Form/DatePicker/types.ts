import type { KeyIndex } from '../types'

export interface ToggleButtonType {
  text: string
  checked: boolean
}

export interface ShowRange extends KeyIndex<boolean> {}

export interface TransitionNameType extends KeyIndex<string> {}

export interface TimeoutType extends KeyIndex<number> {}

export interface DateCellType {
  day: number
  type: string
}

export interface DateRenderType extends KeyIndex<DateCellType[][]> {}

export interface DateStateValueType extends KeyIndex<number> {}

export interface DateStateType extends KeyIndex<DateStateValueType> {}

export interface DateOptionType {
  year: number[]
  month: number[]
}

export interface SelectedDateValueType {
  date: string
  day: number
}

export interface SelectedDateType extends KeyIndex<SelectedDateValueType> {}

export interface TimeStateType {
  start: number
  end: number
}

declare global {
  interface Date {
    getDateFormat(format: string, days: number): string
  }
}