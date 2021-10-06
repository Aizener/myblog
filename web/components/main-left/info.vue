<template>
  <div class="main-left-info p-10 bg-fff">
    <p class="fs-14 pb-15 flex flex-row-between">
      站点信息
      <svg-icon icon-name="icon-site" fill-color="#000"></svg-icon>
    </p>
    <div class="flex flex-row-between">
      <p class="fs-14 color-333">文章数目：</p>
      <p class="fs-14 color-666">53篇</p>
    </div>
    <div class="flex flex-row-between mt-5">
      <p class="fs-14 color-333">运行时间：</p>
      <p class="fs-14 color-666">1天</p>
    </div>
    <div class="flex flex-row-between mt-5">
      <p class="fs-14 color-333">最近动态：</p>
      <p class="fs-14 color-666">2天前</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style lang="scss">
.main-left-info {
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}
</style>