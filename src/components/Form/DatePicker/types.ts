import type { KeyIndex } from '../types'

export const transitionCase = {
  left: 'trans-left',
  right: 'trans-right',
  down: 'trans-down'
} as const

export type TransitionCase = typeof transitionCase[keyof typeof transitionCase]

export const transitionFlag = {
  start: 'start',
  end: 'end'
} as const

export type TransitionFlag = typeof transitionFlag[keyof typeof transitionFlag]

export interface ToggleButtonType {
  text: string
  checked: boolean
}

export interface ShowRange extends KeyIndex<boolean> {}

export interface TransitionNameType {
  start: TransitionCase
  end: TransitionCase
}

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
