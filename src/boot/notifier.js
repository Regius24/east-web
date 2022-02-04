// import { Notify } from 'quasar'

// const notify = (message, caption, icon, color) => {
//   return Notify.create({
//     message: message,
//     caption: caption,
//     icon: icon,
//     color: color,
//     position: 'top-right'
//   })
// }

// export { notify }

import { Notify } from 'quasar'

const position = 'bottom-left'
const timeout = 4000

const positive = (message, caption) => Notify.create({
  message: message,
  caption: caption,
  type: 'positive',
  position: position,
  timeout: timeout
})

const negative = (message, caption) => Notify.create({
  message: message,
  caption: caption,
  type: 'negative',
  position: position,
  timeout: timeout
})

const warning = (message, caption) => Notify.create({
  message: message,
  caption: caption,
  type: 'warning',
  position: position,
  timeout: timeout
})

const info = (message, caption) => Notify.create({
  message: message,
  caption: caption,
  type: 'info',
  position: position,
  timeout: timeout
})

const ongoing = (message, caption) => Notify.create({
  message: message,
  caption: caption,
  type: 'ongoing',
  position: position,
  timeout: timeout
})

export {
  positive,
  negative,
  warning,
  info,
  ongoing
}
