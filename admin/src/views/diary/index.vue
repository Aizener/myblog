<template>
  <div class="diary">
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
          v-if="scope.col === 'cover'"
          class="cover"
          :src="qiniuPreview + scope.row.cover" 
          :preview-src-list="[qiniuPreview + scope.row.cover]">
        </el-image>
        <div v-if="scope.col === 'desc'">
          <el-tooltip :content="scope.row[scope.col]" placement="top">
            <p class="line-2">{{ scope.row[scope.col] }}</p>
          </el-tooltip>
        </div>
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
      title="日志添加"
      v-model="showDrawer"
      :form-data="articleForm"
      :form-rules="articleRules"
      @confirm="handleConfirm"
    ></b-drawer-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import BTable from '@/components/b-table.vue';
import BDrawerForm from '@/components/b-drawer-form.vue';
import { qiniuPreview } from '@/config/index'
import useTable from './useTable';
import useForm from './useForm';

export default defineComponent({
  components: {
    BTable,
    BDrawerForm
  },
  setup() {
    const {
      tableState
    } = useTable();

    const {
      formState,
      handleChangePage,
      handleEdit,
      handleRemove,
      handleRemoveMulti,
      handleSearch,
      handleConfirm
    } = useForm();

    return {
      ...toRefs(tableState),
      ...toRefs(formState),
      qiniuPreview,
      handleChangePage,
      formState,
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
</style>