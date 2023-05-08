export const btnColors = {
  primary: 'primary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  secondary: 'secondary',
  dark: 'dark',
  light: 'light'
} as const

export type BtnColors = typeof btnColors[keyof typeof btnColors]
