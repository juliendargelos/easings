# easings

[![test](https://github.com/juliendargelos/easings/workflows/test/badge.svg?branch=master)](https://github.com/juliendargelos/easings/actions?workflow=test)
[![build](https://github.com/juliendargelos/easings/workflows/build/badge.svg?branch=master)](https://github.com/juliendargelos/easings/actions?workflow=build)
[![version](https://img.shields.io/github/package-json/v/juliendargelos/easings)](https://github.com/juliendargelos/easings)

<img align="right" src="https://github.com/juliendargelos/easings/raw/master/figure.gif" width="277" height="200">

Easing functions in TypeScript.

[Demo](https://julien.gl/easings) (relies on css paint api so you should use Google Chrome for now).

## Install

```bash
npm install @juliendargelos/easings --save
```

## Usage

#### Basic

[All easing functions](#available-easings) take a number in range `[0..1]` and return the eased number.

```typescript
import { cubic } from '@juliendargelos/easings'

cubic(0.1)     // in out
cubic.in(0.2)  // in
cubic.out(0.3) // out
```

You can access easing functions by their name which follows the same pattern as above.

```typescript
import { Easings } from '@juliendargelos/easings'

Easings['exponential'](0.1)
Easings['exponential.in'](0.2)
Easings['exponential.out'](0.3)
```

#### Parameterized easings

Parameterized easings have an extra `with()` method that generate a new easing function based on parameters. Other easings **do not** have the `with()` method (would be pointless), see [*Available easings*](#available-easings).

```typescript
import { elastic } from '@juliendargelos/easings'

// Use default parameterss
elastic(0.1)
elastic.in(0.2)
elastic.out(0.3)

// Use custom parameters (creates a new easing function)
const customElastic = elastic.with({ amplitude: 0.8, period: 0.4 })
const customElasticIn = elastic.in.with({ amplitude: 0.8, period: 0.4 })
const customElasticOut = elastic.out.with({ amplitude: 0.8, period: 0.4 })

customElastic(0.1)
customElasticIn(0.2)
customElasticOut(0.3)
```

#### Available easings

| Name                     | Parameters (default values)     |
|--------------------------|---------------------------------|
| `linear`                 |                                 |
| `quadratic[.in\|.out]`   |                                 |
| `cubic[.in\|.out]`       |                                 |
| `quartic[.in\|.out]`     |                                 |
| `quintic[.in\|.out]`     |                                 |
| `circular[.in\|.out]`    |                                 |
| `sinusoidal[.in\|.out]`  |                                 |
| `bounce[.in\|.out]`      |                                 |
| `exponential[.in\|.out]` | `{ order: 10 }`                 |
| `back[.in\|.out]`        | `{ overshoot: 1.70158 }`        |
| `elastic[.in\|.out]`     | `{ amplitude: 1, period: 0.3 }` |

#### Types

The library exports basic types you might find useful if you want to expose easing options in your own library:

```typescript
import { EasingName, EasingFunction } from '@juliendargelos/easing'

// EasingName represents all string names from the above list ('cubic', 'cubic.in', ...)
// EasingFunction is an alias for (t: number) => number
```
