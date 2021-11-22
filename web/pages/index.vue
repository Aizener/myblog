<template>
  <div class="index">
    <div class="category-list flex flex-wrap py-10 bg-fff" :style="{ transform: `translateY(${scrollTop}px)` }">
      <nuxt-link class="ml-10" :to="`/?tag=${item.id}`" v-for="(item, idx) in list" :key="idx">
        <b-tag :title="item.title" class="item fs-13 hover-underline"></b-tag>
      </nuxt-link>
    </div>
    <b-loading :show="status === 1"></b-loading>
    <b-empty :show="status === 0 && articles.length === 0"></b-empty>

    <div class="articles flex flex-wrap">
      <div class="articles-left flex-1 mr-8">
        <div class="article mt-15" v-for="(item, idx) in getArticleLeft" :key="idx" :style="getStyle(idx, 'left')">
          <img :src="qiniuHost + item.cover" alt="" class="article-cover">
          <div class="article-intro flex-center flex-col bg-fff p-10">
            <p class="fs-14 color-fff text-center">{{ item.title }}</p>
            <div class="article-detail flex mt-10">
              <div class="detail-item flex flex-col-center">
                <svg-icon size="14px" icon-name="icon-browse" fill-color="#fff"></svg-icon>
                <p class="color-fff fs-13 ml-5">{{ item.view }}</p>
              </div>
              <div class="detail-item flex flex-col-center ml-15">
                <svg-icon size="14px" icon-name="icon-comment" fill-color="#fff"></svg-icon>
                <p class="color-fff fs-13 ml-5">{{ item.good }}</p>
              </div>
              <div class="detail-item flex flex-col-center ml-15">
                <svg-icon size="14px" icon-name="icon-good" fill-color="#fff"></svg-icon>
                <p class="color-fff fs-13 ml-5">{{ item.comment }}</p>
              </div>
            </div>
            <nuxt-link :to="`/article/${item.id}`" class="fs-14 color-fff px-10 py-5 mt-10">查看详情</nuxt-link>
          </div>
        </div>
      </div>
      <div class="articles-right flex-1 ml-8">
        <div class="article mt-15" v-for="(item, idx) in getArticleRight" :key="idx" :style="getStyle(idx, 'right')">
          <img :src="qiniuHost + item.cover" alt="" class="article-cover">
          <div class="article-intro flex-center flex-col bg-fff p-10">
            <p class="fs-14 color-fff text-center">{{ item.title }}</p>
            <div class="article-detail flex mt-10">
              <div class="detail-item flex flex-col-center">
                <svg-icon size="14px" icon-name="icon-browse" fill-color="#fff"></svg-icon>
                <p class="color-fff fs-13 ml-5">{{ item.view }}</p>
              </div>
              <div class="detail-item flex flex-col-center ml-15">
                <svg-icon size="14px" icon-name="icon-comment" fill-color="#fff"></svg-icon>
                <p class="color-fff fs-13 ml-5">{{ item.good }}</p>
              </div>
              <div class="detail-item flex flex-col-center ml-15">
                <svg-icon size="14px" icon-name="icon-good" fill-color="#fff"></svg-icon>
                <p class="color-fff fs-13 ml-5">{{ item.comment }}</p>
              </div>
            </div>
            <nuxt-link :to="`/article/${item.id}`" class="fs-14 color-fff px-10 py-5 mt-10">查看详情</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { qiniuHost } from '@/utils/config'
import { getArticleList } from '~/utils/api/article'
import { mapGetters } from 'vuex'

type ArticleType = {
  id: number,
  title: string,
  view: number,
  good: number,
  comment: number,
  cover: string
}

let page = 1, size = 10;

export default Vue.extend({
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      qiniuHost: qiniuHost,
      articles: [],
      articles2: [],
      scrollTop: 0,
      status: 0,
    }
  },
  async asyncData({ query }) {
    const res: any = await getArticleList({
      ...query,
      page,
      size
    });
    if (res && res.code === 200) {
      return {
        articles: res.data,
        status: 0
      }
    }
  },
  watch: {
    article(val) {
      console.log('article', val)
    }
  },
  beforeRouteUpdate({ query }) {
    this.status = 1;
    this.articles = [];
    setTimeout(async () => {
      const res: any = await getArticleList({
        ...query,
        page,
        size
      });
      if (res && res.code === 200) {
        this.articles = res.data;
      }
      this.status = 0;
    }, 500)
  },
  mounted() {
    // document.addEventListener('scroll', () => {
    //   this.scrollTop = document.documentElement.scrollTop
    // })
  },
  computed: {
    ...mapGetters({
      list: 'getTags'
    }),
    getArticleLeft(): Array<ArticleType> {
      return this.articles.filter((item: ArticleType, idx) => idx % 2 === 0)
    },
    getArticleRight(): Array<ArticleType> {
      return this.articles.filter((item: ArticleType, idx) => idx % 2 === 1)
    }
  },
  methods: {
    getStyle(idx: number, type: string) {
      if (type == 'left') {
        switch(idx % 3) {
          case 0:
            return { height: '180px' }
          case 1:
            return { height: '300px' }
          case 2:
            return { height: '220px' }
        }
      } else if (type === 'right') {
        switch(idx % 3) {
          case 0:
            return { height: '240px' }
          case 1:
            return { height: '200px' }
          case 2:
            return { height: '160px' }
        }
      }
    }
  }
})
</script>

<style lang="scss">
.index {
  .item {
    background-color: #00a1d6 !important;
  }

  .category-list {
    position: relative;
    border-radius: 5px;
    z-index: 2;
  }

  .articles {
    .article {
      width: 100%;
      box-shadow: 0 0 5px #333;
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      &-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &-intro {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0; top: 0;
        transition: transform .5s;
        background: rgba(0, 0, 0, .6);
      }
      a {
        border: 1px solid #fff;
      }
      &:hover {
        .article-intro {
          transform: translateY(0);
        }
      }
    }
    &-left {
      .article {
        &-intro {
          transform: translateY(100%);
        }
      }
    }
    &-right {
      .article {
        &-intro {
          transform: translateY(-100%);
        }
      }
    }
  }
}

.page-enter, .page-leave-to {
  opacity: 0;
}
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
</style>