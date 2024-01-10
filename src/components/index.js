import AppCard from './app-card/app-card'

const components = [
  AppCard
]

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }
  components.forEach(component => {
    if (component.name) {
      Vue.component(component.name, component)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 按需引入

export default {
  install,
  ...components
}
