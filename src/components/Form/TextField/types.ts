import { KeyIndex } from '../types'

export const textFieldType = {
  TXT: 'text',
  PWD: 'password'
} as const

export type TextFieldType = typeof textFieldType[keyof typeof textFieldType]

export const textPatternCase = {
  eng: 'eng',
  engnum: 'engnum',
  id: 'id',
  num: 'num',
  wordnum: 'wordnum',
  password: 'password',
  domain: 'domain',
  email: 'email',
  tel: 'tel',
} as const

export type TextPatternCase = typeof textPatternCase[keyof typeof textPatternCase]
