declare global {
  interface String {
    patternCheck(flag: string): boolean
    nl2br(): string
    numberFormat(): string
    fileSize(): string
  }

  interface Number {
    numberFormat(): string
    fileSize(): string
  }
}

export {}