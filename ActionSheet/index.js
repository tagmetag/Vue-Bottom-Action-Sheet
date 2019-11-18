import ActionSheetDefine from './ActionSheet.vue'

function install (Vue) {
  const ActionSheetComponent = Vue.extend(ActionSheetDefine)

  Vue.prototype.$actionSheet = function (...buttons) {
    let instance = new ActionSheetComponent({ propsData: { buttons } })

    let mount = document.createElement('div')
    mount.id = 'actionsheet-' + Date.now()
    document.body.appendChild(mount)

    instance.$mount(mount)

    return instance.activate()
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
