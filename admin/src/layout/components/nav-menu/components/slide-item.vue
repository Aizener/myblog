<template>
  <el-submenu
    class="submenu"
    :index="item.path"
    v-if="item.children && item.children.length > 1 || (item.meta && item.meta.alwaysShow)">
    <template #title>
      <svg-icon
        class="icon"
        :width="14"
        :height="14"
        :icon-name="item.meta.icon"
      ></svg-icon>
      <span>{{ item.meta ?  $t(`message.${item.meta.title}`) : '' }}</span>
    </template>
    <slide-item
      class="inner-submenu"
      v-for="itemChild in item.children"
      :key="itemChild.path"
      :activeIndex="activeIndex"
      :item="itemChild">
    </slide-item>
  </el-submenu>
  <el-menu-item :index="getIndex()" v-else>
    <svg-icon
      class="icon"
      :width="14"
      :height="14"
      :fillColor="fillColor"
      v-if="item.meta && item.meta.icon" :icon-name="item.meta.icon">
    </svg-icon>
    <template #title>
      <span>{{ item.meta ? $t(`message.${item.meta.title}`) : '' }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { ref, PropType, toRefs, computed, defineComponent, watch } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import themes from '@/utils/themes'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: {}
    },
    activeIndex: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props: any) {
    const item = props.item
    const store = useStore()
    const { theme } = toRefs(store.state.app)
    const tm = ref(themes[theme.value])
    const { activeIndex } = toRefs(props)

    watch(() => store.state.app.theme, newVal => {
      tm.value = themes[newVal]
    })

    const fillColor = computed(() => {
      const path = item.children ? item.children[0].path : item.path
      return activeIndex.value === path ? tm.value.slideBarTextAColor : '#BFCBD9'
    })

    const getIndex = () => {
      return item.children ? item.children[0].path : item.path
    }
    
    return {
      item,
      fillColor,
      getIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 15px;
}
</style>