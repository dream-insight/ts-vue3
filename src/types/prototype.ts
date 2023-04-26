declare global {
  interface String {
    patternCheck(flag: string): boolean
    nl2br(): string
    numberFormat(): string
    fileSize(): string
    phoneNumber(): string
    companySerial(): string
  }

  interface Number {
    numberFormat(): string
    fileSize(): string
  }
}

export {}