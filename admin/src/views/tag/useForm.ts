import { addTag, editTag } from '@/utils/api/tag';
import { getCurrentInstance, reactive, ref } from 'vue';

const useForm = (initData: Function) => {
  const formState = reactive<{
    tagForm: any,
    tagRules: any,
    showDrawer: boolean
  }>({
    tagForm: {
      title: { label: '名称', value: '', type: 'text' },
    },
    tagRules: {
      title: { required: true, trigger: 'blur', message: '请输入文章描述' },
    },
    showDrawer: false
  })
  
  const { proxy }: any = getCurrentInstance();
  const drawForm = ref();

  const handleChangePage = () => {}
  const handleEdit = (row: any) => {
    for (const key in row) {
      if (formState.tagForm[key]) {
        formState.tagForm[key].value = row[key];
      }
      if (key === 'id') {
        formState.tagForm[key] = { value: row[key] }
      }
    }
    formState.showDrawer = true;
  }
  const handleConfirm = async (form: any) => {
    let res: any;
    if (form.id) {
      res = await editTag(form);
    } else {
      res = await addTag(form);
    }
    if (res.code === 200) {
      proxy.$message.success({
        message: res.msg
      })
      drawForm.value.resetForm();
      formState.showDrawer = false;
      initData();
    } else {
      proxy.$message.error({
        message: res.msg
      })
    }
  }

  return {
    formState,
    drawForm,
    handleChangePage,
    handleEdit,
    handleConfirm
  }
}

export default useForm;