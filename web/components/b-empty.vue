<template>
  <div class="empty" v-if="show">
    <p>啊哦~暂无内容o(╥﹏╥)o</p>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    show: {
      default: false
    }
  }
})
</script>


<style lang="scss" scoped>
.empty {
  width: 100%;
  background-color: #fff;
  margin-top: 15px;
  border-radius: 5px;
  padding: 30px;
  font-size: 14px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>