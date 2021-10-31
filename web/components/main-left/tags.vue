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
import { getActivityTags } from '~/utils/api/tag'
type Tag = {
  id: number,
  title: string,
  articles: number
}

export default Vue.extend({
  data() {
    return {
      tags: [] as Tag[]
    }
  },
  async created() {
    const res: any = await getActivityTags();
    if (res.code === 200) {
      this.tags = res.data;
    }
    console.log(this.tags)
  },
  methods: {
    getStyle(item: { articles: number }) {
      const num = item.articles
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