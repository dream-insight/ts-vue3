import { KeyIndex } from '../types'

export interface PatternCaseValue {
  pattern: RegExp
  message: string
}

export interface PatternCase extends KeyIndex<PatternCaseValue> {}
