import { addUser, editUser } from '@/utils/api/user';
import { getCurrentInstance, reactive, ref } from 'vue';

const useForm = (initData: Function) => {
  const formState = reactive<{
    userForm: any,
    userRules: any,
    showDrawer: boolean
  }>({
    userForm: {
      email: { label: '邮箱', value: '', type: 'input' },
      password: { label: '密码', value: '', type: 'password' },
      phone: { label: '手机号', value: '', type: 'input' },
      avatar: { label: '头像', value: '', type: 'file' }
    },
    userRules: {
      email: { required: true, trigger: 'blur', message: '请输入邮箱地址' },
      password: { required: true, trigger: 'blur', message: '请输入用户密码' },
      avatar: { required: true, trigger: 'blur', message: '请上传用户头像' }
    },
    showDrawer: false
  })
  
  const { proxy }: any = getCurrentInstance();
  const drawForm = ref();

  const handleChangePage = () => {}
  const handleEdit = (row: any) => {
    for (const key in row) {
      if (formState.userForm[key]) {
        formState.userForm[key].value = row[key];
      }
      if (key === 'id') {
        formState.userForm[key] = { value: row[key] }
      }
    }
    formState.showDrawer = true;
  }
  const handleConfirm = async (form: any) => {
    let res: any;
    if (form.id) {
      res = await editUser(form);
    } else {
      res = await addUser(form);
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