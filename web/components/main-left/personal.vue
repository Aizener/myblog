<template>
  <div class="main-left-personal flex flex-col flex-row-between bg-fff">
    <div class="avatar-wrapper flex flex-row-between px-10 py-15">
      <img class="avatar" src="@/static/avatar.jpg" alt="">
      <div class="flex flex-col py-10">
        <p class="fs-16 fw-bold text-right">好想好想</p>
        <div class="flex mt-5">
          <b-tag title="中二"></b-tag>
          <b-tag class="ml-5" title="宅" color="purple">宅</b-tag>
        </div>
      </div>
    </div>
    <div class="intro flex flex-col px-10 mt-15">
      <p class="fs-13">“花有重开日，人无再少年”</p>
      <p class="fs-13 flex flex-row-end mt-5">“一个简单普通的男孩”</p>
    </div>

    <div class="social flex flex-row-between flex-col-center px-10 mt-30 mb-5">
      <div class="line flex-1"></div>
      <a target="_blank" href="https://github.com/Aizener">
        <svg-icon icon-name="icon-github" size="26px" fill-color="#666" class="social-icon mx-5"></svg-icon>
      </a>
      <div class="line flex-1"></div>
    </div>

    <div class="doc-wrapper flex flex-row-between p-10">
      <div class="flex flex-col flex-col-center doc p-10" @click="$router.push('/')">
        <p class="fs-14 color-fff">{{ article }}</p>
        <p class="fs-14 color-333 color-fff">文章</p>
      </div>
      <div class="flex flex-col flex-col-center doc p-10" @click="$router.push('/diary')">
        <p class="fs-14 color-fff">{{ diary }}</p>
        <p class="fs-14 color-333 color-fff">日志</p>
      </div>
      <div class="flex flex-col flex-col-center doc p-10">
        <p class="fs-14 color-fff">{{ message || '0' }}</p>
        <p class="fs-14 color-333 color-fff">留言</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { getTotal } from '~/utils/api/home';

export default Vue.extend({
  data() {
    return {
      article: '',
      diary: '',
      message: ''
    }
  },
  async created() {
    const res: any = await getTotal();
    if (res && res.code === 200) {
      this.article = res.data.article;
      this.diary = res.data.diary;
      this.message = res.data.message;
    }
  }
})
</script>

<style lang="scss">
.main-left-personal {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
  .avatar-wrapper {
    background: url('@/static/avatar-bg.jpeg') no-repeat;
    background-size: cover;
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      transition: all .5s;
      &:hover {
        filter: invert(1);
      }
    }
  }

  .intro {
    p {
      text-shadow: 0 5px 2px #666;
    }
  }

  .social {
    .line {
      height: 1px;
      background-color: #ddd;
    }
    &-icon {
      &:hover {
        & > svg {
          fill: #000;
        }
      }
    }
  }

  .doc-wrapper {
    .doc {
      box-shadow: 3px 3px 5px #999;
      &:nth-child(1) {
        background-color: tomato;
      }
      &:nth-child(2) {
        background-color: orange;
      }
      &:nth-child(3) {
        background-color: green;
      }
      &:hover {
        box-shadow: 3px 3px 5px inset #666;
        cursor: pointer;
      }
    }
  }
}
</style>