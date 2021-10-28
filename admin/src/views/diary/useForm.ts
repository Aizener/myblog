import { addDiary, editDiary } from '@/utils/api/diary';
import { getCurrentInstance, reactive, ref } from 'vue';

const useForm = (initData: Function) => {
  const formState = reactive<{
    diaryForm: any,
    diaryRules: any,
    showDrawer: boolean
  }>({
    diaryForm: {
      desc: { label: '描述', value: '', type: 'text' },
      content: { label: '文章内容', value: '', type: 'md'  },
      cover: { label: '封面图', value: '', type: 'file' }
    },
    diaryRules: {
      desc: { required: true, trigger: 'blur', message: '请输入文章描述' },
      content: { required: true, trigger: 'blur', message: '请输入文章内容' },
      cover: { required: true, trigger: 'change', message: '请选择文章封面图' }
    },
    showDrawer: false
  })
  
  const { proxy }: any = getCurrentInstance();
  const drawForm = ref();

  const handleChangePage = () => {}
  const handleEdit = (row: any) => {
    for (const key in row) {
      if (formState.diaryForm[key]) {
        formState.diaryForm[key].value = row[key];
      }
      if (key === 'id') {
        formState.diaryForm[key] = { value: row[key] }
      }
    }
    formState.showDrawer = true;
  }
  const handleConfirm = async (form: any) => {
    let res: any;
    if (form.id) {
      res = await editDiary(form);
    } else {
      res = await addDiary(form);
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