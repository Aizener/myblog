import { getUserList, removeUser, removeUserMulti } from '@/utils/api/user';
import { ref, reactive, getCurrentInstance } from 'vue';

const useTable = () => {
  const tableState = reactive<{
    tableHeader: any,
    tableData: any,
    seoForm: any,
    total: number
  }>({
    tableHeader: {
      email: { label: '名称', search: true, type: 'input' },
      phone: { label: '手机号', search: true, type: 'input' },
      avatar: { label: '头像' },
      createTime: { label: '创建时间', width: '200px' },
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
    const res: any = await getUserList(tableState.seoForm);
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
    await proxy.$confirm('确定要删除这篇用户吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res: any = await removeUser(row.id);
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
    await proxy.$confirm('确定要删除这些用户吗?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    const res: any = await removeUserMulti(ids);
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
