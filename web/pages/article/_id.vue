<template>
  <div class="article" v-if="article.id">
    <div class="article-detail">
      <h3 class="article-title">{{ article.title }}</h3>
      <div class="article-info flex flex-row-between">
        <div class="flex">
          <p class="time time1">发布时间：{{ article.createTime }}</p>
          <p class="time time2" v-if="article.updateTime">最近更新：{{ article.updateTime }}</p>
        </div>
        <p class="time ml-30">浏览：{{ article.view }}</p>
      </div>
      <div class="article-content">
        <div class="md-preview default-theme" v-html="article.content"></div>
      </div>
    </div>

    <div class="article-operate mt-15 flex flex-row-end">
      <div class="item" @click="addGoodNum">
        <b-tool :title="String(article.good)" icon-name="icon-good" :loading="loading"></b-tool>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-row-center p-15 bg-fff fs-14 color-333 br-5">文章已经找不到了o(╥﹏╥)o~~~</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { addArticleGood, addArticleView, getArticleById } from '~/utils/api/article';
import '@/utils/style.css';

export default Vue.extend({
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css' }
      ]
    }
  },
  data() {
    return {
      id: 0,
      loading: false,
      articleScrollHeight: 0,
      articleHeight: 0,
      articleTop: 0,
      article: { id: '', title: '', createTime: '', updateTime: '', view: '', good: '', content: '' }
    }
  },
  computed: {
  },
  async asyncData({ params }) {
    const id = Number(params.id);
    const res: any = await getArticleById(id);
    if (res.code === 200) {
      return {
        article: res.data
      }
    }
  },
  methods: {
    async addGoodNum() {
      this.loading = true;
      const res: any = await addArticleGood(this.id);
      if (res.code === 200) {
        this.article = res.data;
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  },
  async mounted() {
    this.id = this.$route.params.id;
    await addArticleView(this.id);
  }
});
</script>

<style lang="scss" scoped>
.article {
  &-detail {
    display: flex;
    flex-direction: column;
    // height: calc(100vh - 250px);
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 0 5px #ccc;
  }
  &-title {
    display: flex;
    justify-content: center;
    color: #333;
  }
  &-info {
    display: flex;
    margin-top: 15px;
    .time {
      font-size: 13px;
      color: gray;
    }
    .time2 {
      margin-left: 30px;
    }
  }
  &-content {
    flex: 1;
    overflow-y: auto;
    margin-top: 15px;
    line-height: 1.5;
    color: #333;
    $color: #888;
    &.all {
      box-shadow: 0 5px 5px -3px inset $color, 0 -5px 5px -3px inset $color;
    }
    &.top {
      box-shadow: 0 5px 5px -3px inset $color, 0 0 0 0 inset $color;
    }
    &.bottom {
      box-shadow: 0 0 0 0 inset $color, 0 -5px 5px -3px inset $color;
    }
  }
  &-operate {
    border-radius: 5px;
    .item {
      width: 70px;
    }
  }
}
</style>