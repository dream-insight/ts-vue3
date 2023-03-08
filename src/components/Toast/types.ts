export interface ToastOptions {
  maxShowMessage?: number
  delay?: number,
  destroy: Function
}

export interface MessageOptions {
  message: string
  icon?: string
  color?: string
}

export type Toast = {
  (params: string): void
  (params: MessageOptions): void
}