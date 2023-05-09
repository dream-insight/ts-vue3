export const modalPosition = {
  popup: 'popup',
  right: 'right',
  left: 'left',
  bottom: 'bottom',
} as const

export type ModalPosition = typeof modalPosition[keyof typeof modalPosition]

export const modalTransition = {
  popup: 'modal-scale',
  right: 'modal-slide-in-right',
  left: 'modal-slide-in-left',
  bottom: 'modal-slide-in-bottom',
} as const

export type ModalTransition = typeof modalTransition[keyof typeof modalTransition]