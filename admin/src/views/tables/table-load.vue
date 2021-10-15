<template>
  <div
    class="table-wrapper"
    :infinite-scroll-disabled="loading"
    infinite-scroll-distance="20"
    v-infinite-scroll="load"
  >
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <template #append>
        <div v-loading="loading" style="height: 60px;"></div>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      loading: false
    })

    const load = () => {
      state.loading = true
      setTimeout(async () => {
        for(let i = 0 ; i < 5 ; i ++) {
          state.tableData.push({
            date: (state.tableData.length - 3).toString(),
            name: '加载数据',
            address: '说一段神话，话说那么一家'
          })
        }
        state.loading = false
      }, 2e3)
    }

    return {
      ...toRefs(state),
      load
    }
  }
})
</script>

<style lang="scss">
.table-wrapper {
  margin: 30px;
  overflow-y: auto;
  height: 400px;
  border: 1px solid #eee;
  .el-table::before {
    top: 0;
  }
}
</style>