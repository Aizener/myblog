import { addMusic, editMusic } from '@/utils/api/music';
import { getCurrentInstance, reactive, ref } from 'vue';

const useForm = (initData: Function) => {
  const formState = reactive<{
    musicForm: any,
    musicRules: any,
    showDrawer: boolean
  }>({
    musicForm: {
      title: { label: '名称', value: '', type: 'text' },
      author: { label: '作者', value: '', type: 'text' },
      url: { label: '地址', value: '', type: 'text' },
    },
    musicRules: {
      title: { required: true, trigger: 'blur', message: '请输入音乐名称' },
      author: { required: true, trigger: 'blur', message: '请输入音乐作者' },
      url: { required: true, trigger: 'blur', message: '请输入音乐地址' },
    },
    showDrawer: false
  })
  
  const { proxy }: any = getCurrentInstance();
  const drawForm = ref();

  const handleChangePage = () => {}
  const handleEdit = (row: any) => {
    for (const key in row) {
      if (formState.musicForm[key]) {
        formState.musicForm[key].value = row[key];
      }
      if (key === 'id') {
        formState.musicForm[key] = { value: row[key] }
      }
    }
    formState.showDrawer = true;
  }
  const handleConfirm = async (form: any) => {
    let res: any;
    if (form.id) {
      res = await editMusic(form);
    } else {
      res = await addMusic(form);
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