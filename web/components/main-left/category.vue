<template>
  <div class="main-left-category bg-fff">
    <div class="fs-14 title p-10 pl-18 fw-bold flex flex-row-between flex-col-center">
      <!-- 小站栏目 -->
      热门栏目
      <nuxt-link to="/">
        <svg-icon class="back-home" icon-name="icon-home" fill-color="#01AAED" size="20px"></svg-icon>
      </nuxt-link>
    </div>
    <div class="category px-10 py-15">
      <div
        class="category-item flex flex-row-between flex-col-center fs-14 pointer mb-10"
        v-for="(item, idx) in category"
        :key="idx"
      >
        <p>{{ item.title }}</p>
        <b-tag class="tag" :title="item.articles"></b-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getActivityCategory } from '~/utils/api/category';

type Category = {
  id: number,
  title: number,
  articles: number
}

export default Vue.extend({
  data() {
    return {
      article: '',
      category: [] as Category[]
    }
  },
  async created() {
    const res: any = await getActivityCategory();
    if (res.code === 200) {
      this.category = res.data;
    }
}
})
</script>

<style lang="scss">
.main-left-category {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  .title {
    border-bottom: 1px solid #ddd;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 7px;
      width: 6px;
      height: 50%;
      background-color: #007fff;
    }
  }

  .category {
    &-item {
      &:hover {
        & > p {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>