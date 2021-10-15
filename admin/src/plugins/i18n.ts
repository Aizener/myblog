import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'

import zhCN from './locales/zh-cn'
import en from './locales/en'

const messages = {
  [enLocale.name]: {
    el: enLocale.el,
    message: en
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    message: zhCN
  }
}

export const types = [zhLocale.name, enLocale.name]

export default (app: App) => {
  const i18n = createI18n({
    locale: 'zh-cn',
    fallbackLocale: zhLocale.name,
    messages
  })
  
  app.use(i18n)
}
