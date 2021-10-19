<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style>
* { margin: 0; box-sizing: border-box; }

.line-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.flex {
  display: flex;
}
.flex-row-center {
  justify-content: center;
}
</style>
