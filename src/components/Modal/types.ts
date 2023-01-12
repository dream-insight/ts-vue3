export interface ModalStyleOptions {
  modalStyleClass: string
  noScrollStyleClass: string
}

export interface ModalOptions {
  type?: string
  message: string
  modalStyleClass?: string
  noScrollStyleClass?: string
  title?: string
  width?: number
  btnOkayText?: string
  btnCancelText?: string
  okay?: Function
  cancel?: Function
  destroy?: Function
}

export interface Modal {
  alert(params: ModalOptions | string): void
  confirm(params: ModalOptions | string): void
}