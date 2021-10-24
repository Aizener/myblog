<template>
  <div class="article">
    <b-table
      type="article"
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
        <div
          v-if="['title', 'desc'].includes(scope.col)"
        >
          <el-tooltip :content="scope.row[scope.col]" placement="top">
            <p class="line-2">{{ scope.row[scope.col] }}</p>
          </el-tooltip>
        </div>
        <div class="tags-wrapper" v-if="scope.col === 'tags'">
          <p class="tags" v-for="(item, idx) in getTags(scope.row.tags)" :key="idx">{{ item }}</p>
        </div>
        <div v-if="scope.col === 'category'">
          <p>{{ getCategories(scope.row.category) }}</p>
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
      title="文章管理"
      v-model="showDrawer"
      :form-data="articleForm"
      :form-rules="articleRules"
      @confirm="hanndleConfirm"
    ></b-drawer-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, toRefs } from 'vue';
import BTable from '@/components/b-table.vue';
import BDrawerForm from '@/components/b-drawer-form.vue';
import { qiniuPreview } from '@/config/index';
import useForm from './useForm';
import useTable from './useTable';
import { getTagList } from '@/utils/api/tag';
import { getCategoryList } from '@/utils/api/category';

export default defineComponent({
  components: {
    BTable,
    BDrawerForm
  },
  setup(props) {
    const {
      tableState,
      initData,
      handleChangePage,
      handleRemove,
      handleRemoveMulti,
      tableRef,
      handleSearch
    } = useTable();
    
    const {
      formState,
      getTags,
      getCategories,
      showDrawer,
      drawForm,
      handleEdit,
      hanndleConfirm
    } = useForm(initData);

    onBeforeMount(async () => {
      const categoryRes: any = await getCategoryList();
      if (categoryRes.code === 200) {
        formState.articleForm.category.options = categoryRes.data.map((item: any) => {
          return { label: item.title, value: item.id }
        })
        tableState.tableHeader.category.options = [{ value: 0, label: '全部' }].concat(formState.articleForm.category.options);
      }
      const tagRes: any = await getTagList();
      if (tagRes.code === 200) {
        formState.articleForm.tags.options = tagRes.data.map((item: any) => {
          return { label: item.title, value: item.id }
        })
      }
    });

    return {
      ...toRefs(tableState),
      ...toRefs(formState),
      getTags,
      tableRef,
      getCategories,
      qiniuPreview,
      showDrawer,
      drawForm,
      handleEdit,
      handleRemove,
      handleRemoveMulti,
      hanndleConfirm,
      handleChangePage,
      handleSearch
    }
  }
})
</script>

<style lang="scss" scoped>
.article {
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
  .addedit {
    padding: 15px;
  }

  .tags {
    padding: 5px 10px;
    color: #fff;
    border-radius: 3px;
    background: #4395ff;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

</style>