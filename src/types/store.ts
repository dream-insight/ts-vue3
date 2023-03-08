export interface StateSession {
  id?: string
  idx?: number
  lev?: string
  name?: string
}

export interface StateCodeName {
  [index: string | number]: any
}

export interface State {
  session: StateSession,
  code: any[],
  codeName: StateCodeName,
  stackPopup: string[],
}