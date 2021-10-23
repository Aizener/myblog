import { reactive } from 'vue';

const useForm = () => {
  const formState = reactive({
    articleForm: {
      title: { label: '标题', value: '', type: 'input' },
      desc: { label: '描述', value: '', type: 'text' },
      content: { label: '文章内容', value: '', type: 'md'  },
      cover: { label: '封面图', value: '', type: 'file' }
    },
    articleRules: {
      title: { required: true, trigger: 'blur', message: '请输入文章标题' },
      desc: { required: true, trigger: 'blur', message: '请输入文章描述' },
      content: { required: true, trigger: 'blur', message: '请输入文章内容' },
      cover: { required: true, trigger: 'change', message: '请选择文章封面图' }
    },
    seoForm: {
      page: 1,
      size: 10
    },
    total: 0,
    showDrawer: false,
  })


  const handleChangePage = () => {}
  const handleEdit = () => {
    formState.showDrawer = true;
  }
  const handleRemove = () => {}
  const handleRemoveMulti = () => {}
  const handleSearch = () => {}
  const handleConfirm = () => {

  }
  return {
    formState,
    handleChangePage,
    handleEdit,
    handleRemove,
    handleRemoveMulti,
    handleSearch,
    handleConfirm
  }
}

export default useForm;