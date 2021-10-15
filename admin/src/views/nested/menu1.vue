<template>
  <div class="nested">
    menu1
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.nested {
  margin: 30px;
  padding: 15px;
  color: #fff;
  background-color: skyblue;
}
</style>