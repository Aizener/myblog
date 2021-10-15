<template>
  <div class="dashboard">
    <div class="panel-wrapper">
      <div class="panel-box" v-for="(item, idx) in cards" :key="idx">
        <card-panel
          :title="item.title"
          :number="item.number"
          :icon-color="item.iconColor"
          :icon-name="item.iconName"
        ></card-panel>
      </div>
    </div>
    <line-charts></line-charts>
  </div>
</template>

<script lang="ts">
import CardPanel from '@/components/card-panel.vue'
import LineCharts from './line-charts.vue'
import { getCurrentInstance, onMounted, reactive } from 'vue'

type CardType = {
  title: string,
  number: number,
  iconColor: string,
  iconName: string
}

const getCards = () => {
  return reactive<Array<CardType>>([{
    title: '拜访人数',
    number: 100,
    iconColor: '#40c9c6',
    iconName: 'icon-person'
  }, {
    title: '组件数量',
    number: 500,
    iconColor: '#36a3f7',
    iconName: 'icon-component'
  }, {
    title: 'Star数量',
    number: 1,
    iconColor: '#f4516c',
    iconName: 'icon-star'
  }, {
    title: '留言数量',
    number: 30,
    iconColor: '#34bfa3',
    iconName: 'icon-message'
  }])
}

export default {
  components: {
    CardPanel,
    LineCharts
  },
  setup() {
    const cards = getCards()
    const { proxy }: any = getCurrentInstance()
    const options = {
      color: ['rgb(246, 81, 112)', 'rgb(0, 138, 205)'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['期望数量', '实际数量'],
        top: 15
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(0, 138, 205)'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgb(0, 138, 205)'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgb(249, 249, 249)', '#fff']
          }
        }
      },
      grid: {
        left: 80,
        top: 50,
        right: 50,
        bottom: 50,
      },
      series: [{
        name: '期望数量',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }, {
        name: '实际数量',
        data: [520, 332, 601, 134, 1190, 1390, 1220],
        type: 'line',
        smooth: true
      }]
    }

    onMounted(() => {
      const lineChart = proxy.$echarts.init(document.getElementById('line-charts'))
      lineChart.setOption(options)
    })

    return {
      cards
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f2f5;
  .panel-wrapper {
    display: flex;
    margin: 20px;
    margin-bottom: 0;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
    .panel-box {
      flex: 1;
      margin-right: 20px;
      @media screen and (max-width: 767px) {
        margin-right: 0;
        margin-top: 15px;
      }
      height: 108px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>