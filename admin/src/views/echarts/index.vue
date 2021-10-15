<template>
  <p class="title">图表使用的是百度echarts图表。</p>
  <pre class="code-box">
    <code ref="codeRef" class="javascript">{{ code }}</code>
  </pre>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js'

export default {
  setup() {
    const codeRef = ref()
    const code = ref(`
      // By highlight.js

      import { getCurrentInstance } from 'vue'

      setup() {
        const { proxy }: any = getCurrentInstance()
        
        onMounted(() => {
          const echarts = proxy.$echarts.init(document.getElementById(targetId))
          const options = {...}
          proxy.setOption(options)
        })
      }`
    )

    onMounted(() => {
      hljs.highlightBlock(codeRef.value)
    })

    return {
      code,
      codeRef
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 30px;
  background: skyblue;
  padding: 10px;
  box-shadow: 0 0 5px #ccc;
  color: #fff;
}
.code-box {
  display: inline-block;
  margin-left: 30px;
  box-sizing: border-box;
  background: skyblue;
  box-shadow: 0 0 5px #ccc;
  .hljs {
    background-color: transparent;
  }
}
</style>