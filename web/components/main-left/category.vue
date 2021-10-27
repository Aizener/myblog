<template>
  <div class="main-left-category bg-fff">
    <div class="fs-14 title p-10 pl-18 fw-bold flex flex-row-between flex-col-center">
      <!-- 小站栏目 -->
      热门栏目
      <nuxt-link to="">
        <svg-icon class="back-home" icon-name="icon-home" fill-color="#01AAED" size="20px"></svg-icon>
      </nuxt-link>
    </div>
    <div class="category px-10 py-15">
      <div class="category-item flex flex-row-between flex-col-center fs-14 pointer mb-10">
        <p>Web前端</p>
        <b-tag class="tag" title="3"></b-tag>
      </div>
      <div class="category-item flex flex-row-between flex-col-center fs-14 pointer mb-10">
        <p>服务端</p>
        <b-tag class="tag" title="1"></b-tag>
      </div>
      <div class="category-item flex flex-row-between flex-col-center fs-14 pointer">
        <p>个人日常</p>
        <b-tag class="tag" title="2"></b-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
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