export interface MessageBoxStyleOptions {
  modalStyleClass?: string
  noScrollStyleClass?: string
}

export interface MessageBoxOptions extends MessageBoxStyleOptions {
  type?: string
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