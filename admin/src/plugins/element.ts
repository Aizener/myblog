import {
  ElAside, ElButton, ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu, ElTooltip,
  ElRadio, ElInput, ElForm, ElFormItem, ElMessage, ElPopover, ElMessageBox, ElRadioButton, ElRadioGroup, ElColorPicker,
  ElTable, ElTableColumn, ElInfiniteScroll, ElLoading, ElPagination, ElImage, ElDrawer, ElSelect, ElOption, ElUpload, ElDialog
} from 'element-plus'
import { App } from 'vue'

export default (app: App) => {
  app
    .use(ElContainer)
    .use(ElMain)
    .use(ElHeader)
    .use(ElAside)
    .use(ElButton)
    .use(ElMenu)
    .use(ElMenuItem)
    .use(ElSubmenu)
    .use(ElMenuItemGroup)
    .use(ElTooltip)
    .use(ElRadioGroup)
    .use(ElRadio)
    .use(ElRadioButton)
    .use(ElInput)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElMessage)
    .use(ElPopover)
    .use(ElMessageBox)
    .use(ElColorPicker)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElInfiniteScroll)
    .use(ElLoading)
    .use(ElPagination)
    .use(ElImage)
    .use(ElDrawer)
    .use(ElSelect)
    .use(ElOption)
    .use(ElUpload)
    .use(ElDialog)
}
