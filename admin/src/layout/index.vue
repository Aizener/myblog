<template>
  <el-container class="wrapper" :style="currStyle">
    <el-aside class="wrapper-aside">
      <nav-menu></nav-menu>
    </el-aside>
    <el-container class="wrapper-main">
      <el-header>
        <top-navbar></top-navbar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import NavMenu from './components/nav-menu/index.vue'
import TopNavbar from './components/top-navbar/index.vue'

import { useStore } from 'vuex'
import themes, { Theme } from '@/utils/themes'

export default defineComponent({
  components: {
    NavMenu,
    TopNavbar
  },
  setup() {
    const store = useStore()
    const { theme } = toRefs(store.state.app)

    const tm = ref<Theme>(themes[theme.value])

    watch(() => store.state.app.theme, newVal => {
      tm.value = themes[theme.value]
    })

    const currStyle = computed(() => {
      return {
        '--theme-bar-toggle-bg': tm.value.slideBarToggleBg,
        '--theme-navbar-bg': tm.value.navbarBackground
      }
    })

    return {
      currStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  &-aside {
    width: auto !important;
    height: 100%;
    overflow-x: hidden;
  }
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 0;
    width: 100%;
    overflow: auto;
  }
}
</style>