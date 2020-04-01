import { easing, parameterizedEasing } from '~/easing'

const pi = Math.PI
const halfPi = pi / 2
const doublePi = pi * 2
const pow = Math.pow
const sqrt = Math.sqrt
const asin = Math.asin
const cos = Math.cos
const sin = Math.sin
const max = Math.max
const b1 = 4 / 11
const b2 = 6 / 11
const b3 = 8 / 11
const b4 = 3 / 4
const b5 = 9 / 11
const b6 = 10 / 11
const b7 = 15 / 16
const b8 = 21 / 22
const b9 = 63 / 64
const b0 = 1 / b1 / b1

export const linear = (t: number): number => t

export const quadratic = easing({
  in: (t: number): number => t * t,
  out: (t: number): number => 1 - --t * t,
  inOut: (t: number): number => 0.5 * ((t *= 2) <= 1
    ? t * t
    : 1 + --t * (2 - t)
  )
})

export const cubic = easing({
  in: (t: number): number => t * t * t,
  out: (t: number): number => 1 + --t * t * t,
  inOut: (t: number): number => 0.5 * ((t *= 2) <= 1
    ? t * t * t
    : 2 + (t -= 2) * t * t
  )
})

export const quartic = easing({
  in: (t: number): number => t * t * t * t,
  out: (t: number): number => 1 - --t * t * t * t,
  inOut: (t: number): number => 0.5 * ((t *= 2) <= 1
    ? t * t * t * t
    : 2 - (t -= 2) * t * t * t
  )
})

export const quintic = easing({
  in: (t: number): number => t * t * t * t * t,
  out: (t: number): number => 1 + --t * t * t * t * t,
  inOut: (t: number): number => 0.5 * ((t *= 2) <= 1
    ? t * t * t * t * t
    : 2 + (t -= 2) * t * t * t * t
  )
})

export const circular = easing({
  in: (t: number): number => 1 - sqrt(1 - t * t),
  out: (t: number): number => sqrt(1 - --t * t),
  inOut: (t: number): number => 0.5 * ((t *= 2) <= 1
    ? 1 - sqrt(1 - t * t)
    : 1 + sqrt(1 - (t -= 2) * t)
  )
})

export const sinusoidal = easing({
  in: (t: number): number => 1 - cos(t * halfPi),
  out: (t: number): number => sin(t * halfPi),
  inOut: (t: number): number => 0.5 * (1 - cos(t * pi))
})

export const bounce = easing({
  in: (t: number): number => 1 - bounce.out(1 - t),
  out: (t: number): number => (
    t < b1 ? b0 * t * t :
      t < b3 ? b0 * (t -= b2) * t + b4 :
        t < b6 ? b0 * (t -= b5) * t + b7 :
          b0 * (t -= b8) * t + b9
  ),
  inOut: (t: number): number => 0.5 * ((t *= 2) <= 1
    ? 1 - bounce.out(1 - t)
    : bounce.out(t - 1) + 1
  )
})

export const exponential = parameterizedEasing({
  in: ({ order = 10 }: { order?: number } = {}) => (t: number): number => (
    pow(2, order * t - order)
  ),
  out: ({ order = 10 }: { order?: number } = {}) => (t: number): number => (
    1 - pow(2, -order * t)
  ),
  inOut: ({ order = 10 }: { order?: number } = {}) => (t: number): number => (
    0.5 * ((t *= 2) <= 1
      ? pow(2, order * t - order)
      : 2 - pow(2, order - order * t)
    )
  )
})

export const back = parameterizedEasing({
  in: ({ overshoot = 1.70158 }: { overshoot?: number } = {}) => (
    (t: number): number => t * t * (t * overshoot + t - overshoot)
  ),
  out: ({ overshoot = 1.70158 }: { overshoot?: number } = {}) => (
    (t: number): number => --t * t * (t * overshoot + t + overshoot) + 1
  ),
  inOut: ({ overshoot = 1.70158 }: { overshoot?: number } = {}) => (
    (t: number): number => 0.5 * ((t *= 2) < 1
      ? t * t * (t * overshoot + t - overshoot)
      : (t -= 2) * t * (t * overshoot + t + overshoot) + 2
    )
  )
})

export const elastic = parameterizedEasing({
  in: ({ amplitude = 1, period = 0.3 }: {
    amplitude?: number
    period?: number
  } = {}) => {
    const f = asin(1 / (amplitude = max(1, amplitude))) * (period /= doublePi)
    return (t: number): number => (
      amplitude * pow(2, 10 * --t) * sin((f - t) / period)
    )
  },
  out: ({ amplitude = 1, period = 0.3 }: {
    amplitude?: number
    period?: number
  } = {}) => {
    const f = asin(1 / (amplitude = max(1, amplitude))) * (period /= doublePi)
    return (t: number): number => (
      1 - amplitude * pow(2, -10 * t) * sin((t + f) / period)
    )
  },
  inOut: ({ amplitude = 1, period = 0.3 }: {
    amplitude?: number
    period?: number
  } = {}) => {
    const f = asin(1 / (amplitude = max(1, amplitude))) * (period /= doublePi)
    return (t: number): number => 0.5 * ((t = t * 2 - 1) < 0
      ? amplitude * pow(2, 10 * t) * sin((f - t) / period)
      : 2 - amplitude * pow(2, -10 * t) * sin((f + t) / period)
    )
  }
})

export const Easings = {
  linear,

  quadratic,
  'quadratic.in': quadratic.in,
  'quadratic.out': quadratic.out,

  cubic,
  'cubic.in': cubic.in,
  'cubic.out': cubic.out,

  quartic,
  'quartic.in': quartic.in,
  'quartic.out': quartic.out,

  quintic,
  'quintic.in': quintic.in,
  'quintic.out': quintic.out,

  circular,
  'circular.in': circular.in,
  'circular.out': circular.out,

  sinusoidal,
  'sinusoidal.in': sinusoidal.in,
  'sinusoidal.out': sinusoidal.out,

  bounce,
  'bounce.in': bounce.in,
  'bounce.out': bounce.out,

  exponential,
  'exponential.in': exponential.in,
  'exponential.out': exponential.out,

  back,
  'back.in': back.in,
  'back.out': back.out,

  elastic,
  'elastic.in': elastic.in,
  'elastic.out': elastic.out
}
