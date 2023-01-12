export interface PatternCaseValue {
  pattern: RegExp;
  message: string;
}

export interface PatternCase {
  [index: string]: PatternCaseValue;
}
