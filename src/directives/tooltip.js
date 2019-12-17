export default {
  bind(el, { value, arg }) {
    window.M.Tooltip.init(el, { html: value, position: arg || 'center' })
  },
  unbind(el) {
    const instance = window.M.Tooltip.getInstance(el)
    if (instance && instance.destroy) {
      instance.destroy()
    }
  }
}