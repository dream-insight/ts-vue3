export const colorCase = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error'
} as const

export type ColorCase = typeof colorCase[keyof typeof colorCase]

export const iconCase = {
  success: 'check-circle',
  warning: 'triangle-exclamation',
  info: 'circle-info',
  error: 'bomb'
} as const

export type IconCase = typeof iconCase[keyof typeof iconCase]

export interface ToastOptions {
  maxShowMessage?: number
  delay?: number,
  destroy: Function
}

export interface MessageOptions {
  message: string
  icon?: IconCase
  color?: ColorCase
}

export interface Toast {
  (params: string | MessageOptions): void
}
