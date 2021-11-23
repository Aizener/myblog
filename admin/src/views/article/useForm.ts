import { getCurrentInstance, ref, reactive } from 'vue';
import { addArticle, editArticle, getArticle, removeArticle, removeArticleMulti } from '@/utils/api/article';
    
const useForm = (initData: Function) => {
  const formState = reactive<{
    articleForm: any,
    articleRules: any
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
    }
  })

  const showDrawer = ref(false);
  const drawForm = ref();

  const { proxy }: any = getCurrentInstance();

  const handleEdit = async (row: any) => {
    const id = row.id;
    const res: any = await getArticle(id);
    if (res.code !== 200) {
      return;
    }
    row.content = res.data.content;
    for (const key in row) {
      if (formState.articleForm[key]) {
        formState.articleForm[key].value = row[key];
      }
      if (key === 'id') {
        formState.articleForm[key] = { value: row[key] }
      }
    }
    showDrawer.value = true;
  }

  const hanndleConfirm = async (model: any) => {
    let res: any = null;
    if (model.id) {
      res = await editArticle(model);
    } else {
      res = await addArticle(model);
    }
    if (res.code === 200) {
      proxy.$message.success({
        message: res.msg
      })
      initData();
      drawForm.value.resetForm();
      showDrawer.value = false;
    } else {
      proxy.$message.error({
        message: res.msg
      })
    }
  }

  const getTags = (tags: any) => {
    if (!formState.articleForm.tags.options) {
      return;
    }
    const filterTags = formState.articleForm.tags.options.filter((item: any) => tags.includes(item.value));
    return filterTags.map((item: any) => item.label);
  }

  const getCategories = (category: number) => {
    if (!formState.articleForm.category.options) {
      return;
    }
    const _category: any = formState.articleForm.category.options.find((item: any) => item.value === category);
    return _category.label;
  }

  return {
    formState,
    showDrawer,
    drawForm,
    handleEdit,
    hanndleConfirm,
    getTags,
    getCategories
  }
}

export default useForm;