<template>
  <div class="flex">
    <input
      type="text"
      class="b-input"
      :class="{ 'right': $slots.right }"
      :value="value"
      :style="getStyle"
      :placeholder="placeholder"
      @input="inputValue"
    />
    <slot name="right"></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String as PropType<string>,
      default: ''
    },
    width: {
      type: String as PropType<string>,
      default: '200px'
    },
    height: {
      type: String as PropType<string>,
      default: '30px'
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请输入'
    }
  },
  computed: {
    getStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  methods: {
    inputValue(e: InputEvent) {
      this.$emit('input', (e.target as HTMLInputElement).value)
    }
  }
})
</script>

<style lang="scss">
.b-input {
  border: 1px solid #eee;
  outline: none;
  padding: 5px 10px;
  border-radius: 3px;
  &::-webkit-input-placeholder {
    font-size: 13px;
  }
  &.right {
    border-radius: 3px 0 0 3px;
  }
}
</style>