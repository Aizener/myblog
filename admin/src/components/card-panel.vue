<template>
  <div class="panel"  @mouseenter="handleEnter" @mouseleave="handleLeave">
    <div class="icon-wrapper" :style="{ backgroundColor: bgColor }">
      <svg-icon :width="52" :height="52" :icon-name="$props.iconName" :fillColor="fillColor"></svg-icon>
    </div>
    <div class="info">
      <p class="panel-text">{{ $props.title }}</p>
      <p class="panel-number">
        <count-up :end="$props.number"></count-up>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType, toRefs } from 'vue'
import CountUp from '@/components/count-up.vue'

export default {
  components: {
    CountUp
  },

  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },
    number: {
      type: Number as PropType<number>,
      required: true
    },
    iconColor: {
      type: String as PropType<string>,
      required: true
    },
    iconName: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props: any) {
    const fillColor = ref(props.iconColor)
    const bgColor = ref('#fff')

    const handleEnter = () => {
      fillColor.value = '#fff'
      bgColor.value = props.iconColor
    }

    const handleLeave = () => {
      fillColor.value = props.iconColor
      bgColor.value = '#fff'
    }

    return {
      bgColor,
      fillColor,
      handleEnter,
      handleLeave
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .icon-wrapper {
    padding: 10px;
    transition: all .5s;
    box-sizing: border-box;
    border-radius: 10px;
  }
  &-text {
    color: rgba(0,0,0,.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
  &-number {
    font-size: 20px;
    color: #666;
    font-weight: bold;
    margin-top: 15px;
  }
}
</style>