declare function registerPaint(name: string, painter: Function): void

declare interface PaintSize {
  width: number
  height: number
}

declare interface StylePropertyMap {
  get(property: string): { toString(): string }
}
