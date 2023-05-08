 export interface MessageBoxStyleOptions {
  modalStyleClass?: string
  noScrollStyleClass?: string
}

export interface MessageBoxOptions extends MessageBoxStyleOptions {
  type?: MessageBoxType
  message: string
  title?: string
  width?: number
  btnOkayText?: string
  btnCancelText?: string
  okay?: Function
  cancel?: Function
  destroy?: Function
}

export interface MessageBox {
  alert(params: MessageBoxOptions | string): void
  confirm(params: MessageBoxOptions | string): void
}

export const messageBoxType = {
  alert: 'alert',
  confirm: 'confirm'
} as const

export type MessageBoxType = typeof messageBoxType[keyof typeof messageBoxType]
