<template>
  <div class="main-left-tags bg-fff p-5 flex flex-wrap flex-row-start flex-col-center">
    <nuxt-link
      class="item m-5 fs-12 hover-shadow"
      to=""
      :style="getStyle(item)"
      v-for="(item, idx) in tags"
      :key="idx"
    >{{ item.title }}</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      tags: [
        { title: 'vue', num: 12 },
        { title: 'uni-app', num: 2 },
        { title: 'node', num: 32 },
        { title: 'css3', num: 22 },
        { title: 'uni-app', num: 2 },
        { title: 'mysql', num: 32 },
        { title: 'nginx', num: 22 },
        { title: 'canvas', num: 112 }
      ]
    }
  },
  methods: {
    getStyle(item: { num: number }) {
      const num = item.num
      const style: {
        fontSize: string,
        backgroundColor: string
      } = { fontSize: '', backgroundColor: '' }
      switch(Math.floor(num / 10)) {
        case 0:
          style.fontSize = '12px'
          style.backgroundColor = 'orange'
          break
        case 1:
          style.fontSize = '13px'
          style.backgroundColor = 'green'
          break
        case 2:
          style.fontSize = '14px'
          style.backgroundColor = 'tomato'
          break
        case 3:
          style.fontSize = '15px'
          style.backgroundColor = 'red'
          break
        default:
          style.fontSize = '16px'
          style.backgroundColor = 'purple'
      }
      return style
    }
  }
})
</script>

<style lang="scss">
.main-left-tags {
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  .item {
    padding: 3px 7px;
    color: #fff;
    background: orange;
    border-radius: 5px;
  }
}
</style>