const { floor, sin, cos, PI } = Math
const turn = 2 * PI
const iconDefaults = { primary: '#F80', secondary: '#FFF' }

const icons = {
  basic(ctx, t, opts) {
    const { primary, secondary, scale } = { ...iconDefaults, ...opts }
    ctx.fillStyle = opts.transparent
    ctx.lineWidth = 2 * scale
    let mid = 8 * scale
    ctx.fillRect(0, 0, 16 * scale, 16 * scale)
    //ctx.ellipse(8*scale, 8*scale, 7*t*scale, 7*t*scale, 0, 0, 2*Math.PI)

    ctx.strokeStyle = secondary
    ctx.beginPath()
    ctx.ellipse(mid, mid, 7 * scale, 7 * scale, 0, 0, turn)
    ctx.stroke()

    ctx.strokeStyle = primary
    ctx.beginPath()
    ctx.ellipse(mid, mid, 7 * scale, 7 * scale, 0, turn * t, turn * t + 1.5)
    ctx.stroke()
  },

  'ring-of-dots': (ctx, t, opts) => {
    const { primary, secondary, scale } = { ...iconDefaults, ...opts }
    ctx.fillStyle = opts.transparent
    ctx.lineWidth = 2 * scale
    let mid = 8 * scale
    let turn = Math.PI * 2
    ctx.fillRect(0, 0, 16 * scale, 16 * scale)

    for (let i = 0; i < turn; i += turn / 7) {
      if (floor((i * 7) / turn) === floor(t * 7)) {
        ctx.fillStyle = primary
      } else {
        ctx.fillStyle = secondary
      }
      ctx.beginPath()
      ctx.ellipse(
        mid + sin(i) * 6 * scale,
        mid + cos(i) * 6 * scale,
        2 * scale,
        2 * scale,
        0,
        0,
        turn
      )
      ctx.fill()
    }
  },
}

const faviconSelector = 'link[rel*=shortcut][rel*="icon"], link[rel*="icon"]'

function getFavicon() {
  return document.querySelector(faviconSelector).href
}

function setFavicon(val) {
  document.querySelector(faviconSelector).setAttribute('href', val)
}

async function mkGif(iconFunc, iconOpts) {
  iconOpts = {
    speed: 1,
    scale: 4,
    frames: 20,
    transparent: '#7A7B7C',
    ...iconOpts,
  }
  await import(/* webpackIgnore: true */ '/gif.js/gif.js')
  var gif = new window.GIF({
    quality: 1,
    repeat: 0,
    workers: 1,
    background: iconOpts.transparent,
    width: 16 * iconOpts.scale,
    height: 16 * iconOpts.scale,
    transparent: parseInt(iconOpts.transparent.replace(/#/, ''), 16),
    debug: false,
    workerScript: '/gif.js/gif.worker.js',
  })
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  for (var t = 0; t < 1; t += 1 / iconOpts.frames) {
    iconFunc(ctx, t, iconOpts)
    let delay = 1000 / iconOpts.frames / iconOpts.speed
    gif.addFrame(ctx, { copy: true, delay })
  }

  return new Promise((resolve, reject) => {
    gif.on('finished', function(blob) {
      resolve(URL.createObjectURL(blob))
    })
    gif.on('abort', reject)
    gif.render()
  })
}

let originalFaviconURL
let loadingActive = false

class Favicon {
  /**
   * Start favicon animation
   * @param {string} iconName the preset animation.
   * @param {object} iconOpts
   * @param {number} iconOpts.speed frame delay divisor.
   * @param {number} iconOpts.scale icon square size multiplyer. (base size: 16)
   * @param {number} iconOpts.frames number of frames for this animation.
   * The iconOpts accept other iconName related options.
   * It will throw if iconName is not found.
   */
  loading(iconName = 'basic', iconOpts) {
    if (!icons[iconName]) {
      return Promise.reject(
        Error(`Favicon animation "${iconName}" does not exist.`)
      )
    }
    if (!originalFaviconURL) originalFaviconURL = getFavicon()
    loadingActive = true
    const start = Date.now()
    return mkGif(icons[iconName], iconOpts).then(url => {
      const buildTime = (Date.now() - start) / 1000
      // eslint-disable-next-line no-console
      console.debug('GIF Done!', buildTime.toFixed(2) + 'secs', url)
      if (!loadingActive) return false
      setFavicon(url)
      return url
    })
  }

  /**
   * Stop favicon animation and recover original icon.
   */
  stop() {
    if (!loadingActive) return false
    loadingActive = false
    setFavicon(originalFaviconURL)
    return true
  }
}

export default new Favicon()
