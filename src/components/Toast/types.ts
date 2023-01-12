export interface ToastOptions {
  maxShowMessage?: number
  delay?: number
}

export interface MessageOptions {
  message: string
  icon?: string
  color?: string
}

export interface Toast {
  (params: MessageOptions | string): void
}