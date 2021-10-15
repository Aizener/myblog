<template>
  <span class="text" :id="randomId"></span>
</template>

<script lang="ts">
import { onMounted, PropType } from 'vue'
import { CountUp } from 'countup.js'

export default {
  props: {
    start: {
      type: Number as PropType<number>,
      default: 0
    },
    end: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props: any) {
    const getRandomStr = () => {
      const strs = 'abcdefghijklmnopqrstuvwxyz'
      let result = ''
      for(let i = 0 ; i < 6 ; i ++) {
        result += strs[Math.floor(Math.random() * strs.length)]
      }
      return result
    }

    const randomId = getRandomStr()
    onMounted(() => {
      const end = props.end
      const countUp = new CountUp(randomId, end)
      countUp.start()
    })

    return {
      randomId
    }
  }
}
</script>

<style lang="scss" scoped>

</style>