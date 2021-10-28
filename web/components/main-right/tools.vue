<template>
  <div class="main-right-tools flex">
    <b-tool title="回到顶部" icon-name="icon-back-top" @handle="handleBackTopFn"></b-tool>
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
</style>