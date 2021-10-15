<template>
  <div id="charts" class="charts"></div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted } from 'vue'

export default {
  setup() {
    const { proxy }: any = getCurrentInstance()
    var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
    xAxisData.push('类目' + i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}

const option = {
    title: {
        text: '柱状图动画延迟'
    },
    legend: {
        data: ['bar', 'bar2']
    },
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            }
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        splitLine: {
            show: false
        }
    },
    yAxis: {
    },
    series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx: any) {
            return idx * 10;
        }
    }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx: any) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx: any) {
        return idx * 5;
    }
};

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