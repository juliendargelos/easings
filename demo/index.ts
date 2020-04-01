const touch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator
const userAgent = navigator.userAgent

;(async () => {
  // never imported, only here to include chunk in bundle
  userAgent && false && import('./worklet')

  if ('paintWorklet' in CSS) {
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      const response = await fetch('worklet.js')
      const blob = await response.blob()
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        (CSS as any).paintWorklet.addModule(reader.result)
      })

      reader.readAsText(blob)
    } else {
      (CSS as any).paintWorklet.addModule('worklet.js')
    }
  } else {
    await import('css-paint-polyfill')
    ;(CSS as any).paintWorklet.addModule('worklet.js')
  }
})()

document.querySelectorAll('figure').forEach((figure) => {
  const container = figure.parentNode!
  let delta: number
  let date: number
  let progress: number
  let previous: number
  let frameRequest: number
  let delay: number
  let animating = false

  const animate = (): void => {
    delta = Date.now() - date
    date += delta
    previous = progress
    progress = progress + delta / 1000

    if (progress > 1) {
      progress = progress % 1
      previous = 0
    }

    figure.style.setProperty('--progress', `${progress}`)
    figure.style.setProperty('--previous', `${previous}`)
    figure.style.setProperty('--delta', `${delta}`)

    frameRequest = requestAnimationFrame(animate)
  }

  container.addEventListener(touch ? 'touchstart' : 'mouseover', () => {
    cancelAnimationFrame(delay)
    if (animating) return
    animating = true
    cancelAnimationFrame(frameRequest)
    progress = previous = 0
    date = Date.now()
    animate()
  })

  container.addEventListener(touch ? 'touchend' : 'mouseout', () => {
    cancelAnimationFrame(delay)
    delay = requestAnimationFrame(() => {
      cancelAnimationFrame(frameRequest)
      figure.style.removeProperty('--progress')
      figure.style.removeProperty('--previous')
      figure.style.removeProperty('--delta')
      animating = false
    })
  })
})

const section = document.querySelector('section')!

for (var placeholder = 0; placeholder < 10; placeholder++) {
  section.appendChild(document.createElement('div'))
}
