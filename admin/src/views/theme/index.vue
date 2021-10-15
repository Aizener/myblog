<template>
  <div class="theme">
    <p>您的当前的主题是：</p>
    <div class="switch">
      切换主题：
      <el-radio-group v-model="theme" @change="handleChange">
        <el-radio-button label="default">默认</el-radio-button>
        <el-radio-button label="light">亮色</el-radio-button>
        <el-radio-button label="guaiyi">怪异</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const theme = computed(() => {
      return store.state.app.theme
    })

    const handleChange = (label: string) => {
      store.dispatch('app/updateTheme', label)
    }

    return {
      theme,
      handleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.theme {
  padding: 30px;
  .switch {
    margin-top: 15px;
  }
}
</style>