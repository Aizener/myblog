import { getArticleList, removeArticle, removeArticleMulti } from '@/utils/api/article';
import { reactive, getCurrentInstance, ref } from 'vue'

const useTable = () => {
  const tableState = reactive<{
    tableHeader: any,
    tableData: any,
    total: number,
    seoForm: any
  }>({
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
  });

  const { proxy }: any = getCurrentInstance();
  const tableRef = ref();

  const handleChangePage = (page: number) => {
    tableState.seoForm.page = page;
    initData();
  }

  const handleSearch = (conditions: any) => {
    tableState.seoForm.page = 1;
    for (const key in conditions) {
      tableState.seoForm[key] = conditions[key];
    }
    initData();
  }

  const handleRemove = async (row: any) => {
    await proxy.$confirm('确定要删除这篇文章吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res: any = await removeArticle(row.id);
    if (res.code === 200) {
      proxy.$message.success({
        message: res.msg
      })
      initData();
      tableRef.value.clearSelect([row.id]);
    } else {
      proxy.$message.error({
        message: res.msg
      })
    }
  }

  const handleRemoveMulti = async (ids: Array<number>) => {
    await proxy.$confirm('确定要删除这些文章吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res: any = await removeArticleMulti(ids);
    if (res.code === 200) {
      proxy.$message.success({
        message: res.msg
      })
      initData();
      tableRef.value.clearSelect(ids);
    } else {
      proxy.$message.error({
        message: res.msg
      })
    }
  }

  const initData = async () => {
    const articleRes: any = await getArticleList(tableState.seoForm);
    if (articleRes.code === 200) {
      tableState.tableData = articleRes.data.map((item: any) => {
        const result = {
          ...item,
          category: item.category.id,
          tags: item.tags.map((_item: any) => _item.id)
        }
        return result;
      });
      tableState.total = articleRes.total;
    } else {
      proxy.$message.danger({
        message: '文章列表获取失败'
      })
    }
  }
  initData();

  return {
    tableState,
    tableRef,
    initData,
    handleChangePage,
    handleSearch,
    handleRemove,
    handleRemoveMulti,
  }
}

export default useTable;