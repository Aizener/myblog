<template>
  <div class="tool pointer flex flex-col flex-col-center bg-fff p-10" :class="{ circle: type === 'circle' }" @click="$emit('handle')">
    <svg-icon :icon-name="iconName" size="28px" fill-color="#1e80ff"></svg-icon>
    <p class="fs-12 color-999 mt-5">{{ title }}</p>
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
    }
  }
})
</script>

<style lang="scss">
.tool {
  border-radius: 5px;
  box-shadow: 3px 3px 5px #999;
  user-select: none;
  &:active {
    box-shadow: 5px 5px 5px inset #999;
  }
  &.circle {
    border-radius: 50%;
  }
}
</style>