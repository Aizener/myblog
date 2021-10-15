<template>
  <el-table
    id="table"
    :data="showData"
    border
    style="width: 100%">
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
      <el-table-column>
        <svg-icon
          class="move"
          :width="20"
          :height="20"
          iconName="icon-move"
        ></svg-icon>
      </el-table-column>
  </el-table>
  <el-pagination
    class="page"
    background
    layout="prev, pager, next"
    :total="16"
    @current-change	="changePage">
  </el-pagination>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import Sortable from 'sortablejs'

export default defineComponent({
  setup() {
    const state = reactive<any>({
      tableData: [],
      page: 1
    })

    const showData = computed(() => {
      return state.tableData.slice((state.page - 1) * 10, state.page * 10)
    })

    for (let i = 0 ; i < 20 ; i ++) {
      state.tableData.push({
        date: String(state.tableData.length + 1),
        name: '草莓啵啵超好吃奶茶',
        address: '书亦烧仙草'
      })
    }

    onMounted(() => {
      const el: any = document.querySelector('.el-table__body tbody')
      const sortable = Sortable.create(el, {
        handle: '.move',
        ghostClass: 'blue-background-class'
      })
    })
    
    const changePage = (page: number) => {
      state.page = page
    }

    return {
      ...toRefs(state),
      showData,
      changePage
    }
  }
})
</script>

<style lang="scss">
.el-table {
  padding: 15px;
  .move {
    cursor: move;
    user-select: none;
  }
  .blue-background-class {
    background: skyblue;
  }
}

.page {
  margin-top: 15px;
  text-align: center;
}
</style>