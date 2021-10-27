<template>
  <div class="index">
    <div class="category-list flex flex-wrap py-10 bg-fff" :style="{ transform: `translateY(${scrollTop}px)` }">
      <nuxt-link class="ml-10" to="" v-for="(item, idx) in list" :key="idx">
        <b-tag :title="item" class="item fs-13 hover-underline"></b-tag>
      </nuxt-link>
    </div>

    <div class="articles flex flex-wrap">
      <div class="articles-left flex-1 mr-8">
        <div class="article mt-15" v-for="(item, idx) in getArticleLeft" :key="idx" :style="getStyle(idx, 'left')">
          <img :src="item.cover" alt="" class="article-cover">
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
            <nuxt-link to="" class="fs-14 color-fff px-10 py-5 mt-10">查看详情</nuxt-link>
          </div>
        </div>
      </div>
      <div class="articles-right flex-1 ml-8">
        <div class="article mt-15" v-for="(item, idx) in getArticleRight" :key="idx" :style="getStyle(idx, 'right')">
          <img :src="item.cover" alt="" class="article-cover">
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
            <nuxt-link to="" class="fs-14 color-fff px-10 py-5 mt-10">查看详情</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type ArticleType = {
  title: string,
  view: number,
  good: number,
  comment: number,
  cover: string
}

export default Vue.extend({
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      list: ['Web前端', '服务端', '个人日常', 'Vue', 'Nest'],
      articles: [
        {
          title: '这是文章的标题这是文章的标题这是文章的标题这是文章的标题',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img0.baidu.com/it/u=551436277,2444343558&fm=26&fmt=auto'
        },
        {
          title: '这是文章的标题这是',
          view: 100,
          good: 20,
          comment: 11,
          cover: 'https://img1.baidu.com/it/u=767725048,195827572&fm=15&fmt=auto'
        },
        {
          title: '这是文章的标题这是文章的标题这',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img2.baidu.com/it/u=2892856748,361950048&fm=15&fmt=auto'
        },
        {
          title: '奥德赛发放',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img0.baidu.com/it/u=1690236998,2081025204&fm=26&fmt=auto'
        },
        {
          title: '这是文章的标题',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img2.baidu.com/it/u=3155018116,3871246300&fm=26&fmt=auto'
        },
        {
          title: '这是文章的标题这是文章的标题这',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img1.baidu.com/it/u=4028025498,339721895&fm=15&fmt=auto'
        },
        {
          title: '奥德赛发放',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img1.baidu.com/it/u=4188097245,2789632243&fm=15&fmt=auto'
        },
        {
          title: '这是文章的标题',
          view: 100,
          good: 20,
          comment: 36,
          cover: 'https://img0.baidu.com/it/u=210529197,2103975609&fm=253&fmt=auto&app=120&f=JPEG?w=301&h=169'
        }
      ],
      scrollTop: 0
    }
  },
  mounted() {
    // document.addEventListener('scroll', () => {
    //   this.scrollTop = document.documentElement.scrollTop
    // })
  },
  computed: {
    getArticleLeft(): Array<ArticleType> {
      return [...this.articles, ...this.articles].filter((item: ArticleType, idx) => idx % 2 === 0)
    },
    getArticleRight(): Array<ArticleType> {
      return [...this.articles, ...this.articles].filter((item: ArticleType, idx) => idx % 2 === 1)
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