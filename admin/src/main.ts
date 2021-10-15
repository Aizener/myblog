import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installSvgIcon from './icons/index'

import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'

import installEcharts from './plugins/echarts'
import installVueI18N from './plugins/i18n'
import '@/utils/mock/index'
import '@/utils/permission'

const app = createApp(App)

installElementPlus(app)
installSvgIcon(app)
installEcharts(app)
installVueI18N(app)

app
  .use(store)
  .use(router)
  .mount('#app')
