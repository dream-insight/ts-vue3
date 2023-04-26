export const checkButtonType = {
  checkbox: 'checkbox',
  radio: 'radio'
} as const

export type CheckButtonType = typeof checkButtonType[keyof typeof checkButtonType]

export interface CheckButtonItem {
  text: string
  value: string
}
