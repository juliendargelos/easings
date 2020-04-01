export type EasingFunction = (t: number) => number

export type EasingName = (
  'linear'      |
  'quadratic'   | 'quadratic.in'   | 'quadratic.out'   |
  'cubic'       | 'cubic.in'       | 'cubic.out'       |
  'quartic'     | 'quartic.in'     | 'quartic.out'     |
  'quintic'     | 'quintic.in'     | 'quintic.out'     |
  'circular'    | 'circular.in'    | 'circular.out'    |
  'sinusoidal'  | 'sinusoidal.in'  | 'sinusoidal.out'  |
  'bounce'      | 'bounce.in'      | 'bounce.out'      |
  'exponential' | 'exponential.in' | 'exponential.out' |
  'back'        | 'back.in'        | 'back.out'        |
  'elastic'     | 'elastic.in'     | 'elastic.out'
)

interface EasingParameters { [parameter: string]: unknown }

type EasingParameterizer<
  Parameters extends EasingParameters
> = (parameters?: Partial<Parameters>) => EasingFunction

type ParameterizedEasing<
  Parameters extends EasingParameters
> = EasingFunction & { with: EasingParameterizer<Parameters> }

type Easing<
  Function extends EasingFunction = EasingFunction
> = Function & Record<'in' | 'out', Function>

const parameterize = <
  Parameters extends EasingParameters
>(
  easing: EasingParameterizer<Parameters>
): ParameterizedEasing<Parameters> => Object.assign(easing(), {
  with: easing
})

export const easing = <
  Function extends EasingFunction = EasingFunction
>(
  easings: Record<'in' | 'out' | 'inOut', Function>
): Easing<Function> => Object.assign(easings.inOut, {
  in: easings.in,
  out: easings.out
})

export const parameterizedEasing = <
  Parameters extends EasingParameters
>(
  easings: Record<'in' | 'out' | 'inOut', EasingParameterizer<Parameters>>
): Easing<ParameterizedEasing<Parameters>> => (
  easing<ParameterizedEasing<Parameters>>({
    in: parameterize(easings.in),
    out: parameterize(easings.out),
    inOut: parameterize(easings.inOut)
  })
)
