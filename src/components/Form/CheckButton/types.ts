export const checkButtonColors = {
  primary: 'primary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  secondary: 'secondary',
  dark: 'dark',
} as const

export type CheckButtonColors = typeof checkButtonColors[keyof typeof checkButtonColors]


export const checkButtonType = {
  checkbox: 'checkbox',
  radio: 'radio'
} as const

export type CheckButtonType = typeof checkButtonType[keyof typeof checkButtonType]

export interface CheckButtonItem {
  text: string
  value: string
}

export interface CheckButton {
  check: Function
  resetForm: Function
  resetValidate: Function
}