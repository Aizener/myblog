<template>
  <div id="charts" class="charts"></div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted } from 'vue'

export default {
  setup() {
    const { proxy }: any = getCurrentInstance()
    const option = {
    legend: {
        top: 'bottom'
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                {value: 40, name: 'rose 1'},
                {value: 38, name: 'rose 2'},
                {value: 32, name: 'rose 3'},
                {value: 30, name: 'rose 4'},
                {value: 28, name: 'rose 5'},
                {value: 26, name: 'rose 6'},
                {value: 22, name: 'rose 7'},
                {value: 18, name: 'rose 8'}
            ]
        }
    ]
}

    onMounted(() => {
      const echarts = proxy.$echarts.init(document.getElementById('charts'))
      echarts.setOption(option)
    })
  }
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 50px;
}
</style>