import { Easings, EasingFunction, EasingName } from '../src'

const scale = 0.6
const margin = 10
const ball = 6
const cursor = 4
const graduation = 7
const doublePi = Math.PI * 2

class EasingPainter {
  public static get inputProperties(): string[] {
    return [
      '--easing',
      '--progress',
      '--previous',
      '--delta'
    ]
  }

  public paint(
    context: CanvasRenderingContext2D,
    size: PaintSize,
    properties: StylePropertyMap
  ): void {
    const ease = Easings[properties.get('--easing').toString().trim() as EasingName]

    if (!ease) return

    const progress = parseFloat(properties.get('--progress').toString())
    const animation = !isNaN(progress)
    const rangeX = ~~(size.width * scale) - margin * 2
    const rangeY = ~~(size.height * scale) - margin * 2
    const startX = ~~((size.width - 1 - rangeX) / 2)
    const startY = ~~((size.height - 1 - rangeY) / 2)

    if (animation) {
      context.strokeStyle = '#dedede'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(startX - graduation, startY)
      context.lineTo(startX, startY)
      context.lineTo(startX, startY + rangeY + graduation)
      context.moveTo(startX - graduation, startY + rangeY)
      context.lineTo(startX + rangeX, startY + rangeY)
      context.lineTo(startX + rangeX, startY + rangeY + graduation)
      context.stroke()
      context.closePath()
    }

    context.strokeStyle = animation ? '#000' : '#ddd'
    context.lineWidth = 2
    context.setLineDash([])
    context.beginPath()

    for (var position = 0; position <= rangeX; position++) context.lineTo(
      position + startX,
      (1 - ease(position / rangeX)) * rangeY + startY
    )

    context.stroke()
    context.closePath()

    if (!animation) return

    const previous = parseFloat(properties.get('--previous').toString()) || progress
    const delta = parseFloat(properties.get('--delta').toString()) || 0
    const value = ease(progress)
    const x = progress * rangeX + startX
    const y = (1 - value) * rangeY + startY
    const speed = Math.max(0, Math.min(0.5, (
      (value - ease(previous)) * delta - 0.2
    )))

    context.strokeStyle = '#aaa'
    context.beginPath()
    context.arc(x, y, cursor, 0, doublePi)
    context.stroke()
    context.closePath()

    context.lineWidth = 1
    context.setLineDash([2, 3])
    context.beginPath()
    context.moveTo(size.width - ball, y)
    context.lineTo(x + cursor, y)
    context.moveTo(startX + 1, y)
    context.lineTo(x - cursor, y)
    context.moveTo(x, startY + rangeY - 1)
    context.lineTo(x, y + cursor)
    context.stroke()
    context.closePath()

    context.beginPath()
    context.ellipse(
      size.width - ball,
      y,
      ball,
      ball + ball * speed,
      0,
      0,
      doublePi
    )
    context.fill()
    context.closePath()
  }
}

registerPaint('easing', EasingPainter)
