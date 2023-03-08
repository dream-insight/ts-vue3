export interface CheckButtonItem {
  text: string
  value: string | number
}

export type CheckButtonProps = {
  modelValue: string | string[]
  items: CheckButtonItem[]
  name: string
  // checkbox, radio
  type?: string
  // 전체 버튼 추가
  all?: boolean
  // 최대 체크 가능한 수량
  maxCheck?: number
  validate?: Function[]
  // 강제 에러 출력 - check함수를 수행 하지 않음
  errorMessage?: string
  // button UI 변경
  button?: boolean
}
