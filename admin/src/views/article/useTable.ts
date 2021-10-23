import { getArticleList } from '@/utils/api/article';
import { reactive, getCurrentInstance } from 'vue'

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

  const handleChangePage = (page: number) => {
    tableState.seoForm.page = page;
    initArticleData();
  }

  const handleSearch = (conditions: any) => {
    tableState.seoForm.page = 1;
    for (const key in conditions) {
      tableState.seoForm[key] = conditions[key];
    }
    initArticleData();
  }

  const initArticleData = async () => {
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
  initArticleData();

  return {
    tableState,
    initArticleData,
    handleChangePage,
    handleSearch
  }
}

export default useTable;