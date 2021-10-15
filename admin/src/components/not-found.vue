<template>
  <div class="box">
    <img src="@/assets/imgs/404.png" alt="img not found." />
    <div class="text">
      <p class="tip">啊哦，找不到页面啦o(╥﹏╥)o</p>
      <div class="reson">
        <p>当您看到这个页面，</p>
        <p>说明该资源可能已经不存在或者没有权限访问，</p>
        <p>也有可能是访问的链接出错。</p>
      </div>
      <a href="https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96" target="_blank">
      点击查看vue-route@next的404实现方案
      </a>
      <div class="back-home" @click="handleBack">回到首页</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const handleBack = () => {
      router.push({ path: '/' })
    }

    return {
      handleBack
    }
  }
}
</script>

<style lang="scss">
.box {
  display: flex;
  margin: 180px 0 0 180px;
  img {
    width: 507px;
    height: 278px;
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    margin-top: 50px;
  }
  .tip {
    font-size: 20px;
    color: #666;
  }
  .reson {
    font-size: 14px;
    color: #999;
    margin-top: 15px;
    line-height: 1.5;
  }
  a {
    color: green;
    margin-top: 15px;
  }
  .back-home {
    background: #1482f0;
    margin-top: 15px;
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>