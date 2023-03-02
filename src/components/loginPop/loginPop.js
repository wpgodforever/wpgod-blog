import loginPop from './loginPop.vue'
import { createApp } from 'vue'

let mountNode
let createMount = (opts) => {
	if(mountNode){//确保只存在一个弹框
		document.body.removeChild(mountNode)
    	mountNode = null
	}
  mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const app = createApp(loginPop, {
    ...opts,
     modelValue: true,
    remove() { //传入remove函数，组件内可移除dom 组件内通过props接收
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
      mountNode = null
    }
  })
  return app.mount(mountNode)
}
function loginPopFn(options = {}) {
  options.id = options.id || 'loginPop' + 1 //唯一id 删除组件时用于定位
  let $inst = createMount(options)
  return $inst
}
loginPopFn.install = app => {
  app.component('v3-popup', loginPop)
  app.config.globalProperties.$loginPop = loginPopFn
}
export default loginPopFn