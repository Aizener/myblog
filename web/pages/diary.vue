<template>
  <div class="diary">
    <!-- <div class="timeline bg-fff p-10"></div> -->
    <div class="diary-list">
      <div class="diary-list-item bg-fff p-10 mb-15" v-for="(item, idx) in [...list, ...list, ...list]" :key="idx">
        <div class="top flex flex-row-between fs-14 color-666 pb-10">
          <p>2021-10-06 16:10</p>
          <p>天气：晴</p>
        </div>
         <div class="info fs-14 mt-15 flex pb-15">
           <img class="info-img" :src="item.url" alt="">
           <p class="flex-1">{{ item.intro }}</p>
         </div>
         <nuxt-link to="" class="fs-14 color-999 mt-10 flex flex-row-end hover-underline">查看更多>></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      list: [
        {
          url: 'https://img2.baidu.com/it/u=3963316195,1496847376&fm=26&fmt=auto',
          intro: '这是笔记的内容'.repeat(20)
        },
        {
          url: 'https://img2.baidu.com/it/u=2424315057,391145254&fm=15&fmt=auto',
          intro: '这是笔记的内容'.repeat(10)
        }
      ]
    }
  }
})
</script>

<style lang="scss">
.diary-list {
  &-item {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    overflow: hidden;
    .top {
      border-bottom: 1px solid #eee;
    }
    .info {
      height: 140px;
      border-bottom: 1px solid #eee;
      &-img {
        width: 200px;
        height: 100%;
        margin-right: 15px;
        object-fit: cover;
        border-radius: 4px;
      }
    }
  }
}
</style>