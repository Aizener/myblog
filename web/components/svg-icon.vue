<template>
  <i class="icon flex">
    <!-- aria-hidden, 帮助残障人士阅读(设备读取内容时会跳过这个标签以免混淆) -->
    <svg aria-hidden="true" :width="size" :height="size" :fill="fillColor">
      <use :xlink:href="'#' + iconName"></use>
    </svg>
  </i>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    size: {
      type: String as PropType<string>,
      default: '16px'
    },
    fillColor: {
      type: String as PropType<string>,
      default: '#333'
    },
    iconName: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>