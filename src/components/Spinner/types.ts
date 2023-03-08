export interface Spinner {
  timeout(limit: number): this
  show(msg?: string): void
  delay(sec: number): this
  hide(): void
}