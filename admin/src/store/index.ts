import { createStore } from 'vuex'

interface modulesType { [propName: string]: any }
interface StoreType {
  [propName: string]: any
}

const ctx = require.context('./modules', true, /\.ts$/)
const modules: modulesType = {}

ctx.keys().forEach((module, path) => {
  const moduleName = module.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = ctx(module)
  modules[moduleName] = value.default
})

export default createStore<StoreType>({
  modules
})
