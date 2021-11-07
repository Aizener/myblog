<template>
  <div class="loading" v-if="show">
    <div class="loading-circle"></div>
    <span class="loading-text">加载中...</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  background-color: #fff;
  margin-top: 15px;
  border-radius: 5px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-circle {
    width: 35px;
    height: 35px;
    border: 2px solid #ccc;
    border-radius: 50%;
    border-right-color: #ddd;
    animation: rotate 1s infinite linear;
  }
  &-text {
    font-size: 12px;
    color: gray;
    margin-top: 10px;
  }
}

@keyframes rotate {
  0% { transform: rotate(0); }
  100% { transform: rotate(365deg); }
}
</style>