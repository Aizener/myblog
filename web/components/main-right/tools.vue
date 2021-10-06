<template>
  <div class="main-right-tools flex">
    <div class="tool pointer flex flex-col flex-col-center bg-fff p-10" @click="handleBackTopFn">
      <svg-icon icon-name="icon-back-top" size="28px" fill-color="#1e80ff"></svg-icon>
      <p class="fs-12 color-999 mt-5">回到顶部</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      current: 0,
      time: 0
    }
  },
  methods: {
    handleBackTopFn() {
      this.handleMoveFn()
    },
    handleMoveFn() {
      requestAnimationFrame(() => {
        this.current = this.easeInOut(this.time / 1000, 0, document.documentElement.scrollTop, .5)
        this.time += 16
        document.documentElement.scrollTop -= this.current
        if (document.documentElement.scrollTop > 0) {
          this.handleMoveFn()
        } else {
          this.time = 0
          this.current = 0
        }
      })
    },
    /*
    t: current time（当前时间）；   ---- elapsed
    b: beginning value（初始值）； ---- start
    c: change in value（变化量）； ---- range
    d: duration（持续时间）。 ---- speed
    原文链接：https://blog.csdn.net/weixin_43606158/article/details/97565377
    */
    easeInOut(t: number, b: number , c: number, d: number){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * (( t)*(t-2) - 1) + b;
		}
  }
})
</script>

<style lang="scss">
.main-right-tools {
  .tool {
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
  }
}
</style>