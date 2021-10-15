import { App } from 'vue'
import SvgIcon from '@/components/svg-icon.vue'

export default (app: App) => {
  app.component('svg-icon', SvgIcon)
}

const requireContext = require.context('./svg', false, /\.svg$/)

const requireAll = (ctx: __WebpackModuleApi.RequireContext) => {
  ctx.keys().forEach(ctx)
}

requireAll(requireContext)