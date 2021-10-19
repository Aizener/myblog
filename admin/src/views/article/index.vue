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
          <p>{{ getCategory(scope.row.category) }}</p>
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
      title="文章添加"
      v-model="showDrawer"
      :form-data="articleForm"
      :form-rules="articleRules"
      @confirm="hanndleConfirm"
    ></b-drawer-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref, toRefs } from 'vue';
import BTable from '@/components/b-table.vue';
import BDrawerForm from '@/components/b-drawer-form.vue';
import initData from './initData';
import { ArticleType } from '@/config/type';
import { qiniuPreview } from '@/config/index';
import useForm from './useForm';

export default defineComponent({
  components: {
    BTable,
    BDrawerForm
  },
  setup(props) {
    const state = reactive<{
      articleForm: any,
      articleRules: any,
      tableHeader: any,
      tableData: any,
      total: any,
      seoForm: any
    }>({
      articleForm: {
        title: { label: '标题', value: '', type: 'input' },
        desc: { label: '描述', value: '', type: 'text' },
        content: { label: '文章内容', value: '', type: 'md'  },
        cover: { label: '封面图', value: '', type: 'file' },
        category: { label: '分类', value: undefined, type: 'select' },
        tags: { label: '标签', value: [], type: 'select-multi' },
      },
      articleRules: {
        title: { required: true, trigger: 'blur', message: '请输入文章标题' },
        desc: { required: true, trigger: 'blur', message: '请输入文章描述' },
        content: { required: true, trigger: 'blur', message: '请输入文章内容' },
        cover: { required: true, trigger: 'change', message: '请选择文章封面图' },
        category: { required: true, trigger: 'change', message: '请选择分类' },
        tags: { required: true, trigger: 'change', message: '请选择标签' }
      },
      tableHeader: {
        title: { label: '标题', width: '200px', search: true, type: 'input' },
        desc: { label: '描述', width: '350px', search: true, type: 'input' },
        cover: { label: '封面图', width: '160px' },
        view: { label: '浏览数', width: '80px'},
        good: { label: '点赞数', width: '80px'},
        message: { label: '留言数', width: '80px'},
        category: { label: '分类', width: '160px', search: true, type: 'select' },
        tags: { label: '标签', width: '200px' },
        updateTime: { label: '修改时间', width: '120px' },
        createTime: { label: '创建时间', width: '120px' }
      },
      tableData: [],
      total: 0,
      seoForm: {
        page: 1,
        size: 6
      }
    })
    const { initArticleData }: any = initData(state);

    const handleChangePage = (page: number) => {
      state.seoForm.page = page;
      initArticleData();
    }

    const handleSearch = (conditions: any) => {
      state.seoForm.page = 1;
      for (const key in conditions) {
        state.seoForm[key] = conditions[key];
      }
      initArticleData();
    }

    const {
      getTags,
      getCategory,
      showDrawer,
      tableRef,
      drawForm,
      handleEdit,
      handleRemove,
      handleRemoveMulti,
      hanndleConfirm
    } = useForm(state, initArticleData);

    return {
      ...toRefs(state),
      getTags,
      tableRef,
      getCategory,
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