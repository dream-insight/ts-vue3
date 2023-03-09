import { KeyIndex } from '../types'

export const textFieldType = {
  TXT: 'text',
  PWD: 'password'
} as const

export type TextFieldType = typeof textFieldType[keyof typeof textFieldType]

export interface PatternCaseValue {
  pattern: RegExp
  message: string
}

export interface PatternCase extends KeyIndex<PatternCaseValue> {}
