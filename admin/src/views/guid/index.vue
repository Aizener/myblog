<template>
  <div class="guid">
    <p class="tip">引导页主要是用来作为第一次进入系统的人， 来指示一些功能的使用，我们可以基于<a href="https://github.com/kamranahmedse/driver.js">driver.js</a>来实现引导页。</p>
    <el-button type="primary" @click="handleStart">点击演示</el-button>
  </div>
</template>

<script lang="ts">
import { nextTick, onMounted } from '@vue/runtime-core'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

export default {
  setup() {
    const driver = new Driver({
      doneBtnText: '完成',        // Text on the last button
      closeBtnText: '关闭',      // Text on the close button
      nextBtnText: '下一步',        // Next button text
      prevBtnText: '上一步'
    })

    const steps = [
      {
        element: '.navbar-icon',
        popover: {
          title: '收缩按钮',
          description: '展开/关闭左边的菜单栏',
          position: 'bottom'
        }
      },
      {
        element: '#navbar-title',
        popover: {
          title: '标题',
          description: '显示当前选中的菜单名称',
          position: 'bottom'
        }
      },
      {
        element: '#navbar-user-info',
        popover: {
          title: '用户信息',
          description: '显示当前用户的信息和操作',
          position: 'left'
        }
      },
      {
        element: '#navbar-github',
        popover: {
          title: 'Github仓库',
          description: '该应用的Github仓库源码',
          position: 'left'
        }
      }
    ]

    const handleStart = () => {
      setTimeout(() => {
        driver.defineSteps(steps)
        driver.start()
      })
    }

    return {
      handleStart
    }
  }
}
</script>

<style lang="scss" scoped>
.guid {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
}
.tip {
  padding: 10px;
  background: skyblue;
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
  a {
    color: green;
  }
}
</style>