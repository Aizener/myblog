<template>
  <el-menu
    class="menu"
    v-if="theme"
    :background-color="theme.slideBarBackground"
    :text-color="theme.slideBarTextColor"
    :active-text-color="theme.slideBarTextAColor"
    :default-active="activeIndex"
    :collapse="isCollapse"
    @select="selectItem"
  >
    <template v-for="route in routes" :key="route.path" >
      <slide-item v-if="route.children" :activeIndex="activeIndex" :item="route"></slide-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import themes from '@/utils/themes'
import SlideItem from './components/slide-item.vue'

export default defineComponent({
  components: {
    SlideItem
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const { routes, isCollapse, theme } = toRefs(store.state.app)
    const _routes = router.getRoutes()
    const state = reactive({
      menuRefs: [],
      activeIndex: '/dashboard',
      theme: themes[theme.value]
    })

    watch(() => store.state.app.theme, newVal => {
      state.theme = themes[newVal]
    })

    const selectItem = (index: string) => {
      state.activeIndex = index
      const paths = index.split('/')
      const lastPath = paths[paths.length - 1]
      const target = _routes.find((route: any) => {
        return lastPath === 'index' ? route.path === '/' + paths[1] : route.path === index
      }) || { meta: null }
      const title = target.meta ? target.meta.title === '首页' ? '' : target.meta.title : ''
      store.dispatch('app/setNavbarTitle', title)
      router.push({ path: index })
    }


    watch(() => route.path, path => {
      setPah(path)
    })

    const setPah = (path: string) => {
      state.activeIndex = path
      selectItem(path)
    }
    setPah(route.path)
    
    return {
      ...toRefs(state),
      isCollapse,
      routes,
      selectItem
    }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  width: 200px;
  height: 100%;
}
.el-menu--collapse {
  width: 64px;
}
.submenu {
  & /deep/ .el-menu-item, & /deep/ .inner-submenu .el-submenu__title {
    background-color: var(--theme-bar-toggle-bg) !important;
  }
}
</style>