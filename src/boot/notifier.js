import { Notify } from 'quasar'

const notify = (message, caption, icon, color) => {
  return Notify.create({
    message: message,
    caption: caption,
    icon: icon,
    color: color,
    position: 'bottom-right'
  })
}

export { notify }
