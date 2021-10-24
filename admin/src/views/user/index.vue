<template>
  <div class="user">
    <b-table
      ref="tableRef"
      :data="tableData"
      :table-header="tableHeader"
      @add="showDrawer = true"
      @edit="handleEdit"
      @remove="handleRemove"
      @remove-multi="handleRemoveMulti"
      @search="handleSearch"
    >
      <template v-slot="scope">
        <el-image 
          v-if="scope.col === 'avatar'"
          class="cover"
          :src="qiniuPreview + scope.row.avatar" 
          :preview-src-list="[qiniuPreview + scope.row.avatar]">
        </el-image>
      </template>
    </b-table>
    <el-pagination
      class="page flex flex-row-center"
      background
      layout="prev, pager, next"
      :page-size="seoForm.size"
      :total="total"
      @current-change="handleChangePage"
    ></el-pagination>
    <b-drawer-form
      ref="drawForm"
      title="分类管理"
      v-model="showDrawer"
      :form-data="userForm"
      :form-rules="userRules"
      @confirm="handleConfirm"
    ></b-drawer-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import BTable from '@/components/b-table.vue';
import BDrawerForm from '@/components/b-drawer-form.vue';
import { qiniuPreview } from '@/config/index'
import useTable from './useTable';
import useForm from './useForm';


export default defineComponent({
  components: {
    BTable,
    BDrawerForm,
  },
  setup() {
    const {
      tableState,
      tableRef,
      initData,
      handleSearch,
      handleRemove,
      handleRemoveMulti,
    } = useTable();

    const {
      formState,
      drawForm,
      handleChangePage,
      handleEdit,
      handleConfirm
    } = useForm(initData);

    return {
      ...toRefs(tableState),
      ...toRefs(formState),
      qiniuPreview,
      tableRef,
      drawForm,
      handleChangePage,
      handleEdit,
      handleRemove,
      handleRemoveMulti,
      handleSearch,
      handleConfirm
    }
  }
})
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 30px;
}
.cover {
  width: 100%;
  height: 80px;
  object-fit: cover;;
  & ::v-deep .el-image__inner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>