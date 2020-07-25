import { Easings, EasingName, EasingFunction, linear, quadratic } from '../src'
import { Mesh, Program, Transform, Color } from 'ogl'

const DEFAULT_COUNT = 1000

interface Transition {
  offset: number
  delta: number
  repeat: boolean
  easing: EasingFunction
  duration: number
  date: number
  complete: () => void
}

export class Easing extends Transform {
  // private readonly gl: WebGLRenderingContext
  private frameRequest: number
  private progress: number = -1
  private transitions: Map<'progress', Transition> = new Map()
  private curveOpacityUniform: { value: 1 }
  private animationOpacityUniform: { value: 0 }
  public easing: EasingFunction
  public curve: Mesh
  public graduations: Mesh
  public lines: Mesh
  public ball: Mesh
  public render: () => void
  public animating: boolean = false

  public constructor(gl: WebGLRenderingContext, {
    easing,
    render = () => {},
    count = DEFAULT_COUNT,
  }: {
    easing: EasingName
    update?: () => void
    count?: number
  }) {
    super()
    this.easing = easing
    this.render = render

    this.curve = new Mesh({
      mode: gl.LINES,
      renderOrder: 1,
      geometry: new Geometry(gl, {
        position: { data: this.sample(count, false), size: 2 }
      }),
      program: new Program(gl, {
        vertex: lineVertex,
        fragment: lineFragment,
        uniforms: {
          opacity: this.curveOpacityUniform,
          color: { value: new Color(0, 0, 0) }
        }
      })
    })

    this.graduations = new Mesh({
      mode: gl.LINES,
      renderOrder: 0,
      geometry: new Geometry(gl, {
        position: { data: new Float32Array([-1, -1, -1, 1, 1, -1]), size: 2 },
        index: { data: new Uint16Array([0, 1, 0, 2]), size: 1 }
      }),
      program: new Program(gl, {
        vertex: lineVertex,
        fragment: lineFragment,
        uniforms: {
          opacity: this.animationOpacityUniform,
          color: { value: new Color(0.5, 0.5, 0.5) }
        }
      })
    })

    this.lines = new Mesh({
      mode: gl.LINES,
      renderOrder: 2,
      geometry: new Geometry(gl, {
        position: { data: new Float32Array([0, 0, -1, 0, 0, -1, 1, 0]), size: 2 },
        index: { data: new Uint16Array([0, 1, 0, 2, 0, 3]), size: 1 }
      }),
      program: new Program(gl, {
        vertex: lineVertex,
        fragment: lineFragment,
        uniforms: {
          opacity: this.animationOpacityUniform,
          color: { value: new Color(0.5, 0.5, 0.5) },
          dash: { value: new Vector2(2, 1) }
        }
      })
    })

    this.cursor = new Mesh({
      mode: gl.POINTS,
      renderOrder: 3,
      geometry: new Geometry(gl, {
        position: { data: new Float32Array([0, 0]), size: 2 }
      }),
      program: new Program(gl, {
        vertex: ellipseVertex,
        fragment: ellipseFragment,
        uniforms: {
          opacity: this.animationOpacityUniform,
          color: { value: new Color(0.5, 0.5, 0.5) },
          stroke: { value: 0.1 }
        }
      })
    })

    this.ball = new Mesh({
      mode: gl.POINTS,
      renderOrder: 4,
      geometry: new Geometry(gl, {
        position: { data: new Float32Array([0, 0]), size: 2 }
      }),
      program: new Program(gl, {
        vertex: ellipseVertex,
        fragment: ellipseFragment,
        uniforms: {
          opacity: this.animationOpacityUniform,
          color: { value: new Color(0, 0, 0) }
        }
      })
    })

    this.addChild(this.curve)
  }

  private tick = (): void => {
    this.update()
    this.render()

    if (this.transitions.size) {
      this.frameRequest = requestAnimationFrame(this.tick)
    } else {
      this.sleep()
    }
  }

  private awake(): void {
    this.frameRequest === null && this.tick()
  }

  private sleep(): void {
    cancelAnimationFrame(this.frameRequest)
    this.frameRequest = null
  }

  private update(): void {
    const time = performance.now()

    this.transitions.forEach((property, {
      offset,
      delta,
      duration,
      date,
      easing
    }) => {
      const progress = (time - date) / duration
      if (progress < 1) {
        this[property] = easing(progress) * delta + offset
      } else {
        this[property] = delta + offset
        if (repeat) {
          this.transition(property, {
            from: offset,
            to: delta + offset,
            duration,
            easing,
            date: time
          })
        } else {
          this.transitions.remove(property)
        }
      }
    })

    if (this.animationOpacity) {
      this.addChild(this.graduations)
      this.addChild(this.lines)
      this.addChild(this.ball)
    } else {
      this.removeChild(this.graduations)
      this.removeChild(this.lines)
      this.removeChild(this.ball)
    }
  }

  private transition(property: string, {
    to,
    duration,
    date = performance.now(),
    from = this[property],
    delta = to - from,
    repeat = false,
    easing = linear,
    complete = () => {}
  }: { from: number, to: number } & Transition): void {
    this.transitions.set(property, {
      offset: from,
      duration,
      date,
      delta,
      repeat,
      easing,
      complete
    })
  }

  public sample(
    count: number = DEFAULT_COUNT,
    updateAttribute: boolean = true
  ): Float32Array {
    const sample = new Float32Array(count * 2)
    let index, positionIndex, progress

    for (index = 0; index < count; index++) {
      progress = index / count
      positionIndex = index * 2
      sample[positionIndex] = progress * 2 - 1
      sample[positionIndex + 1] = this.easing(progress) * 2 - 1
    }

    if (updateAttribute) {
      const attribute = this.geometry.attribute.position
      attribute.data = sample
      attribute.needsUpdate = true
    }

    return sample
  }

  public animate(): void {
    if (this.animating) return

    const date = performance.now()

    this.animating = true

    this.transition('progress', {
      from: 0,
      to: 1,
      duration: 1500,
      repeat: true,
      date
    })

    this.transition('curveOpacity', {
      to: 1,
      easing: quadratic,
      duration: 500,
      date
    })

    this.transition('animationOpacity', {
      to: 1,
      easing: quadratic,
      duration: 500,
      date
    })

    this.awake()
  }

  public freeze(): void {
    if (!this.animating) return
    this.animating = false

    const date = performance.now()

    this.transition('curveOpacity', {
      to: 0.5,
      easing: quadratic,
      duration: 500,
      date
    })

    this.transition('animationOpacity', {
      to: 0,
      easing: quadratic,
      duration: 500,
      date,
      complete: () => this.transitions.remove('progress')
    })
  }
}
