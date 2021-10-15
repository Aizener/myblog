<template>
  <i class="icon-box">
    <svg :width="width" :height="height" :fill="fillColor" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </i>
</template>

<script lang="ts">
import { PropType, toRefs } from 'vue'

export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String as PropType<String>,
      required: true
    },
    width: {
      type: Number as PropType<Number>,
      required: true
    },
    height: {
      type: Number as PropType<Number>,
      required: true
    },
    fillColor: {
      type: String as PropType<String>,
      default: '#BFCBD9'
    }
  },
  setup(props: any) {
    const { iconName: _iconName, width, height, fillColor } = toRefs(props)
    const iconName = '#' + _iconName.value
    
    return {
      iconName,
      width,
      height,
      fillColor
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-box {
  vertical-align: baseline;
  svg {
    transition: all .5s;
  }
}
</style>