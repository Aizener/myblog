<template>
  <p class="b-tag color-fff fs-12" :style="{ backgroundColor: color }">{{ title }}</p>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#1E90FF'
    }
  }
})
</script>

<style lang="scss">
.b-tag {
  padding: 3px 10px;
  border-radius: 5px;
}
</style>