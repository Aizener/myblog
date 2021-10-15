<template>
  <div class="custom-component">
    <textarea id="text" :value="clipbardContent"></textarea>
    <div
      class="svg-icon-clipboard"
      v-for="(item, idx) in svgs"
      :key="idx"
      data-clipboard-target="#text"
      @click="handleCopy(item)"
    >
      <el-tooltip class="svg-icon-box" effect="dark" :content="`<svg-icon icon-name=${item}></svg-icon>`" placement="bottom">
        <div>
          <svg-icon :icon-name="'icon-' + item" :width="64" :height="64"></svg-icon>
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import ClipboardJS from 'clipboard'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const { proxy }: any = getCurrentInstance()

    const files = require.context('../../icons/svg', false, /\.svg$/)
    const svgs = reactive(files.keys().map(file => {
      const matchs = file.match(/\.\/([\w-]+)\.svg/)
      return RegExp.$1
    }))
    const clipbardContent = ref('')

    const handleCopy = (iconName: string) => {
      clipbardContent.value = `<svg-icon icon-name=${iconName}></svg-icon>`
    }

    onMounted(() => {
      const clipboard = new ClipboardJS('.svg-icon-clipboard')
      clipboard.on('success', e => {
        if (proxy.$i18n) {
          ElMessage.success({
            message: proxy.$i18n.t('message.copySuccess'),
            type: 'success'
          })
          e.clearSelection()
        }
      })
    })
    
    return {
      svgs,
      handleCopy,
      clipbardContent
    }
  }
}
</script>

<style lang="scss" scoped>
#text {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.custom-component {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-left: 30px;
}
.svg-icon-box {
  background: #fff;
  box-shadow: 0 0 5px #ccc;
  border-radius: 10px;
  width: 128px;
  height: 128px;
  @media screen and (max-width: 767px) {
    width: 108px;
    height: 108px;
  }
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 30px;
  span {
    color: #BFCBD9;
  }
}
</style>