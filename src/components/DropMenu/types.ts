export interface DropMenuItem {
  text: string
  action: Function
}

export const dropMenuPosition = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const

export type DropMenuPosition = typeof dropMenuPosition[keyof typeof dropMenuPosition]

export const dropMenuTransition = {
  slide: 'drop-menu-slide',
  fade: 'drop-menu-fade',
  scale: 'drop-menu-scale',
} as const

export type DropMenuTransition = typeof dropMenuTransition[keyof typeof dropMenuTransition]