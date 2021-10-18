import { getCurrentInstance, ref } from 'vue';
import { addArticle, editArticle } from '@/utils/api/article';
    
const useForm = (state: any, initArticleData: any) => {
  const showDrawer = ref(false);
  const drawForm = ref();
  const { proxy }: any = getCurrentInstance();

  const handleEdit = (row: any) => {
    for (const key in row) {
      if (state.articleForm[key]) {
        state.articleForm[key].value = row[key];
      }
      if (key === 'id') {
        state.articleForm[key] = { value: row[key] }
      }
    }
    showDrawer.value = true;
  }

  const handleRemove = (row: any) => {
    console.log(row)
  }

  const handleRemoveMulti = (ids: Array<number>) => {
    console.log(ids);
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
      initArticleData();
      drawForm.value.resetForm();
      showDrawer.value = false;
    } else {
      proxy.$message.error({
        message: res.msg
      })
    }
  }

  const getTags = (tags: any) => {
    if (!state.articleForm.tags.options) {
      return;
    }
    const filterTags = state.articleForm.tags.options.filter((item: any) => tags.includes(item.value));
    return filterTags.map((item: any) => item.label);
  }

  const getCategory = (category: number) => {
    if (!state.articleForm.category.options) {
      return;
    }
    const _category: any = state.articleForm.category.options.find((item: any) => item.value === category);
    return _category.label;
  }

  return {
    showDrawer,
    drawForm,
    handleEdit,
    handleRemove,
    handleRemoveMulti,
    hanndleConfirm,
    getTags,
    getCategory
  }
}

export default useForm;