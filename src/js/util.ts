class util {
  ifEmpty(v: string, recover: string): string {
    return v ? v : recover
  }
}

export const useUtil = () => {
  return new util()
}