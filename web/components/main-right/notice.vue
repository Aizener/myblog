<template>
  <div class="main-right-notice">
    <div class="notice-wrapper bg-fff">
      <div class="title p-10 flex flex-row-between">
        <p class="fs-16 fw-bold">公告栏</p>
        <svg-icon icon-name="icon-notice" size="20px"></svg-icon>
      </div>
      <div class="list">
        <p class="item fs-13 color-999 p-10">
          阿斯加德福利卡时间段里看风景sad
          <nuxt-link class="color-0ff" to="/article/1">详情>></nuxt-link>
        </p>
        <p class="item fs-13 color-999 p-10">
          阿斯加德福利卡时间段里看风景sad
          <nuxt-link class="color-0ff" to="/article/1">详情>></nuxt-link>
        </p>
        <p class="item fs-13 color-999 p-10">
          阿斯加德福利卡时间段里看风景sad
          <nuxt-link class="color-0ff" to="/article/1">详情>></nuxt-link>
        </p>
      </div>
      <div class="flex flex-row-center flex-col-center py-10">
        <nuxt-link class="fs-14 ml-5 color-666 hover-underline" to="/board">更多公告</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.main-right-notice {
  width: 100%;
  .notice-wrapper {
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    .title {
      border-bottom: 1px solid #ddd;
    }

    .list {
      .item {
        border-bottom: 1px dashed #ccc;
        display: flex;
        flex-direction: column;
      }
      a {
        text-decoration: underline;
        align-self: flex-end;
      }
    }
  }
}
</style>