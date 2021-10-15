<template>
  <div class="international">
    <div class="title">
      <svg-icon icon-name="icon-international" :width="18" :height="18"></svg-icon>
      <p>切换语言</p>
    </div>
    <div class="languages">
      <div class="btns">
        <el-radio v-model="radio" :label="item.key" border size="medium" v-for="(item, idx) in languages" :key="idx" @change="handleChange">{{ item.value }}</el-radio>
      </div>
      <p>
        {{ $t('message.internationalTitle1') }}
        <a href="https://vue-i18n-next.intlify.dev/introduction.html" target="_blank">vue-i18n</a>
        {{ $t('message.internationalTitle2') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useStore } from 'vuex'
import { types } from '@/plugins/i18n'

interface langTypes {
  [propName: string]: any
}

export default {
  setup() {
    const store = useStore()
    const { proxy }: any = getCurrentInstance()

    const resolve = (lang: string): { key: string, value: string} => {
      const langs: langTypes = {
        'zh-cn': '简体中文',
        'en': 'English'
      }
      return { key: lang, value: langs[lang] }
    }
    const languages = types.map(resolve)
    const radio = ref(store.state.app.localeLang)

    const handleChange = (label: string) => {
      store.dispatch('app/setLocaleLang', label)
      proxy.$i18n.locale = store.state.app.localeLang
    }

    return {
      radio,
      languages,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.international {
  border: 1px solid skyblue;
  border-radius: 5px;
  width: 50%;
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    width: 90%;
    margin: 10px auto;
    .btns {
      display: flex;
      flex-wrap: nowrap;
    }
  }
  .title {
    border-bottom: 1px solid skyblue;
    padding: 15px;
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
      margin-top: -2px;
    }
  }
  .languages {
    padding: 15px;
    p {
      margin-top: 15px;
      padding: 10px;
      background: skyblue;
      color: #fff;
      a {
        color: green;
      }
    }
  }
}
</style>