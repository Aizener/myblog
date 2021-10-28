import { getCategoryList, removeCategory, removeCategoryMulti } from '@/utils/api/category';
import { ref, reactive, getCurrentInstance } from 'vue';

const useTable = () => {
  const tableState = reactive<{
    tableHeader: any,
    tableData: any,
    seoForm: any,
    total: number
  }>({
    tableHeader: {
      title: { label: '名称', search: true, type: 'input' },
      createTime: { label: '创建时间', width: '200px' }
    },
    tableData: [],
    seoForm: {
      page: 1,
      size: 10
    },
    total: 0
  })

  const { proxy }: any = getCurrentInstance();
  const tableRef = ref();

  const initData = async () => {
    const res: any = await getCategoryList(tableState.seoForm);
    if (res.code === 200) {
      tableState.tableData = res.data;
    } else {
      proxy.$message.error({
        message: res.msg
      })
    }
  }

  const handleSearch = (conditions: any) => {
    tableState.seoForm.page = 1;
    for (const key in conditions) {
      tableState.seoForm[key] = conditions[key];
    }
    initData();
  }
  const handleRemove = async (row: any) => {
    await proxy.$confirm('确定要删除这篇分类吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res: any = await removeCategory(row.id);
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
    await proxy.$confirm('确定要删除这些分类吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res: any = await removeCategoryMulti(ids);
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

  initData();

  return {
    tableState,
    initData,
    tableRef,
    handleSearch,
    handleRemove,
    handleRemoveMulti,
  }
}

export default useTable;

