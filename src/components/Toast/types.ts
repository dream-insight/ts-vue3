export const toastColorCase = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  danger: 'danger'
} as const

export type ToastColorCase = typeof toastColorCase[keyof typeof toastColorCase]

export const toastIconCase = {
  success: 'check_circle_outline',
  warning: 'warning_amber',
  info: 'info_outline',
  danger: 'dangerous'
} as const

export type ToastIconCase = typeof toastIconCase[keyof typeof toastIconCase]

export interface ToastOptions {
  maxShowMessage?: number
  delay?: number,
  destroy: Function
}

export interface MessageOptions {
  message: string
  icon?: ToastIconCase
  color?: ToastColorCase
}

export interface Toast {
  (params: string | MessageOptions): void
}
