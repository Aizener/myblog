import { getArticleList } from '@/utils/api/article';
import { getCategory } from '@/utils/api/category';
import { getTagList } from '@/utils/api/tag';
import { getCurrentInstance, onBeforeMount } from 'vue';

const initData = (state: any) => {
  const { proxy }: any = getCurrentInstance();

  onBeforeMount(async () => {
    const categoryRes: any = await getCategory();
    if (categoryRes.code === 200) {
      state.articleForm.category.options = categoryRes.data.map((item: any) => {
        return { label: item.title, value: item.id }
      })
      state.tableHeader.category.options = [{ value: 0, label: '全部' }].concat(state.articleForm.category.options);
    }
    const tagRes: any = await getTagList();
    if (tagRes.code === 200) {
      state.articleForm.tags.options = tagRes.data.map((item: any) => {
        return { label: item.title, value: item.id }
      })
    }
  });

  const initArticleData = async () => {
    const articleRes: any = await getArticleList(state.seoForm);
    if (articleRes.code === 200) {
      state.tableData = articleRes.data.map((item: any) => {
        const result = {
          ...item,
          category: item.category.id,
          tags: item.tags.map((_item: any) => _item.id)
        }
        return result;
      });
      state.total = articleRes.total;
    } else {
      proxy.$message.danger({
        message: '文章列表获取失败'
      })
    }
  }
  initArticleData();

  return {
    initArticleData
  }
};

export default initData;