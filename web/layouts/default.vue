<template>
  <div class="container pb-30" @click="showMenu = false" @click.right.stop.prevent="handleClickedMenuFn">
    <header class="header">
      <div class="header-container mx-auto mt-20">
        <div class="line-top flex flex-row-between flex-col-center">
          <b-input
            width="500px"
            height="35px"
            v-model="searchVal"
          >
            <template slot="right">
              <svg-icon
                class="flex-center bg-eee px-10 pointer"
                fillColor="#666"
                icon-name="icon-search"
              ></svg-icon>
            </template>
          </b-input>

          <div class="logreg">
            <nuxt-link class="logreg-log fs-14 color-fff" to="">登录</nuxt-link>
            <nuxt-link class="logreg-reg fs-14 color-fff ml-10" to="">注册</nuxt-link>
          </div>
        </div>

        <div class="line-bottom flex mt-20">
          <b-link icon-name="icon-home" title="主站" url="/"></b-link>
          <b-link icon-name="icon-diary" title="日志" url="/diary" class="ml-15"></b-link>
        </div>
      </div>
    </header>
    <div class="main-container flex flex-col-start">
      <div style="min-width: 200px;"></div>
      <div class="main-left">
        <main-left-personal></main-left-personal>
        <main-left-category class="mt-15"></main-left-category>
        <main-left-tags class="mt-15"></main-left-tags>
        <main-left-info class="mt-15"></main-left-info>
      </div>
      <div class="main flex-1 mx-15"><nuxt /></div>
      <div class="main-right">
        <main-right-notice></main-right-notice>
        <main-right-music class="mt-15"></main-right-music>
        <main-right-tools class="mt-15"></main-right-tools>
      </div>
      <div style="min-width: 250px;"></div>
    </div>
    <transition v-if="init" name="fade">
      <div class="menu bg-fff" v-show="showMenu" :style="getMenuStyle" :key="menuKey">
        <div class="menu-item flex flex-col-center pointer p-10" @click="handleClick('home')">
          <svg-icon icon-name="icon-home" fill-color="#666"></svg-icon>
          <p class="ml-10 color-666">回到首页</p>
        </div>
        <div class="menu-item flex flex-col-center pointer p-10" @click="handleClick('refresh')">
          <svg-icon icon-name="icon-refresh" fill-color="#666"></svg-icon>
          <p class="ml-10 color-666">刷新页面</p>
        </div>
        <!-- <div class="menu-item flex flex-col-center pointer p-10" @click="handleClick('coder')">
          <svg-icon icon-name="icon-coder" fill-color="#666"></svg-icon>
          <p class="ml-10 color-666">开发者工具</p>
        </div> -->
        <div class="menu-music flex flex-row-center p-10" @click.stop="">
          <svg-icon class="pointer" icon-name="icon-last" size="30" fill-color="#666" @click.native="handleClick('last')"></svg-icon>
          <svg-icon class="pointer mx-20" icon-name="icon-playstop" size="30" fill-color="#666" @click.native="handleClick('toggle')"></svg-icon>
          <svg-icon class="pointer" icon-name="icon-next" size="30" fill-color="#666" @click.native="handleClick('next')"></svg-icon>
        </div>
        <div class="menu-time py-10 pr-5">
          <p class="fs-13 text-right color-666">{{ currentTime }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import svgIcon from '~/components/svg-icon.vue'

export default Vue.extend({
  components: { svgIcon },
  data() {
    return {
      searchVal: '',
      showMenu: false,
      menuLeft: 0,
      menuTop: 0,
      menuKey: 0,
      init: false,
      currentTime: ''
    }
  },
  computed: {
    getMenuStyle(): Object {
      const style: {
        left?: string,
        top?: string,
        right?: string,
        bottom?: string
      } = { left: '', top: '', right: '', bottom: '' }
      if (this.menuTop > window.innerHeight - 160) {
        style.top = ''
        style.bottom = (window.innerHeight - this.menuTop) + 'px'
      } else {
        style.top = this.menuTop + 'px'
        style.bottom = ''
      }
      if (this.menuLeft > window.innerWidth - 180) {
        style.left = ''
        style.right = (window.innerWidth - this.menuLeft) + 'px'
      } else {
        style.left = this.menuLeft + 'px'
        style.right = ''
      }
      return style
    }
  },
  mounted() {
    this.init = true;
    this.setCurrentTime();
  },
  methods: {
    setCurrentTime() {
      this.currentTime = this.getCurrentTime();
      setTimeout(() => {
        this.setCurrentTime();
      }, 1e3)
    },
    getCurrentTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      const second = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    handleClick(type: string) {
      switch(type) {
        case 'home':
          this.$router.push('/');
          break;
        case 'refresh':
          window.location.reload();
          break;
        case 'last':
          this.$root.$emit('music-last');
          break;
        case 'next':
          this.$root.$emit('music-next');
          break;
        case 'toggle':
          this.$root.$emit('music-toggle');
          break;
        case 'coder':
          break;
      }
    },
    handleClickedMenuFn(e: MouseEvent) {
      this.menuLeft = e.pageX
      this.menuTop = e.pageY
      if (this.showMenu) {
        this.menuKey ++
        return
      }
      this.showMenu = true
    }
  }
})
</script>

<style lang="scss">
$width: 1050px;
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 140px;
  background: url(https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg) repeat;
  // background-attachment: fixed;
  // background-size: cover;
}
.header {
  width: 100%;
  height: 140px;
  position: fixed;
  left: 0; top: 0;
  z-index: 9;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0; top: 0;
    background: url(http://img.xiaoyou66.com/images/2021/01/23/VlmhX.png) no-repeat;
    background-size: cover;
    opacity: .7;
  }
  &-container {
    width: $width;
    position: relative;
    z-index: 2;
    .logreg {
      &-log {
        padding: 10px 20px;
        background-color: #1E90FF;
        border-radius: 3px;
      }
      &-reg {
        text-decoration: underline;
      }
    }
  }
}
.main-container {
  width: $width;
  margin: 15px auto;
  background-size: cover;
  .main-left, .main-right {
    width: 200px;
    height: calc(100vh - 165px);
    position: fixed;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-track {
      width: 7px;
      border-radius: 3px;
      background-color: #eee;
    }
    &::-webkit-scrollbar-thumb {
      width: 7px;
      height: 7px;
      border-radius: 3px;
      background: #ccc;
    }
  }
  .main-right {
    width: 250px;
    right: calc((100% - 1050px) / 2);
  }
  // .main {
  //   width: 600px;
  //   padding: 0 15px;
  //   margin: 0 auto;
  // }
}

.menu {
  box-shadow: 0 0 5px #ccc;
  position: fixed;
  border-radius: 5px;
  width: 180px;
  overflow: hidden;
  &-item {
    border-bottom: 1px dashed #ddd;
    &:hover {
      background-color: #eee;
    }
  }
  &-music {
    border-bottom: 1px dashed #ddd;
  }
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
</style>