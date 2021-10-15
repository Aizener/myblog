import * as echarts from 'echarts'
import { App } from 'vue'

export default (app: App) => {
  app.config.globalProperties.$echarts = echarts
}