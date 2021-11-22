<template>
  <div class="tool pointer flex flex-col flex-col-center bg-fff p-10" :class="{ circle: type === 'circle' }" @click="$emit('handle')">
    <div v-show="!loading">
      <svg-icon :icon-name="iconName" size="28px" fill-color="#1e80ff"></svg-icon>
      <p class="fs-12 color-999 mt-5">{{ title }}</p>
    </div>
    <div v-show="loading" >
      <svg-icon class="tool-loading" icon-name="icon-loading" size="28px" fill-color="#999"></svg-icon>
      <p class="fs-12 color-999 mt-5">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'square'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.tool {
  border-radius: 5px;
  box-shadow: 3px 3px 5px #999;
  user-select: none;
  text-align: center;
  &:active {
    box-shadow: 5px 5px 5px inset #999;
  }
  &.circle {
    border-radius: 50%;
  }
  &-loading {
    display: inline-flex;
    animation: rotate 1s infinite linear;
  }
}

@keyframes rotate {
  0% { trannsform: rotate(0); }
  100% { transform: rotate(365deg); }
}
</style>