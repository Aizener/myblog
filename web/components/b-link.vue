<template>
  <div class="b-link flex flex-col-center">
    <svg-icon
      fill-color="#fff"
      :icon-name="iconName"
      v-if="iconName"
    ></svg-icon>
    <nuxt-link :to="url" class="color-fff fs-14 fw-bold" size="14px">{{ title }}</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    iconName: {
      type: String as PropType<string>,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      required: true
    },
    url: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.b-link {
  position: relative;
  display: flex;
  justify-content: center;
  &:hover {
    &::after {
      width: 100%;
    }
  }
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    transition: width .3s;
    background-color: #fff;
  }
  a {
    margin-left: 2px;
  }
}
</style>