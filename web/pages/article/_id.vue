<template>
  <div class="article">
    <div class="article-detail">
      <h3 class="article-title">这是文章的标题，可能会比较的长哦这是文章的标题，可能会比较的长哦</h3>
      <div class="article-info flex flex-row-between">
        <div class="flex">
          <p class="time time1">发布时间：2021-10-25 21:46</p>
          <p class="time time2">最近更新：2021-10-25 21:46</p>
        </div>
        <p class="time ml-30">浏览：333</p>
      </div>
      <div class="article-content" @scroll="onScroll" :class="getClass">
        {{ '撒的发生的快递费静安寺克劳福德静安寺'.repeat(100) }}
      </div>
    </div>

    <div class="article-operate mt-15 flex flex-row-end">
      <div class="item">
        <b-tool title="11" icon-name="icon-good"></b-tool>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { throttle } from '~/utils';


export default Vue.extend({
  data() {
    return {
      articleScrollHeight: 0,
      articleHeight: 0,
      articleTop: 0
    }
  },
  computed: {
    getClass() {
      if (this.articleScrollHeight > this.articleTop) {
        if (this.articleTop >= this.articleScrollHeight - this.articleHeight) {
          return 'top';
        } else if (this.articleTop > 0) {
          return 'all';
        } else {
          return 'bottom';
        }
      } else {
        return '';
      }
    }
  },
  methods: {
    onScroll(e: any) {
      // (this as any).handleArticleScrollEvent(e);
    }
  },
  mounted() {
    // (this as any).handleArticleScrollEvent = throttle((e: any) => {
    //   const target = e.target;
    //   this.articleScrollHeight = target.scrollHeight;
    //   this.articleTop = target.scrollTop;
    //   this.articleHeight = target.offsetHeight;
    // });
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