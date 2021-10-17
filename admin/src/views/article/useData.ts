import { getCategory } from '@/utils/api/category';
import { getTag } from '@/utils/api/tag';

const useData = async (state: any) => {
  const categoryRes: any = await getCategory();
  if (categoryRes.code === 200) {
    state.articleForm.category.options = categoryRes.data.map((item: any) => {
      return { label: item.title, value: item.id }
    })
  }
  const tagRes: any = await getTag();
  if (tagRes.code === 200) {
    state.articleForm.tags.options = tagRes.data.map((item: any) => {
      return { label: item.title, value: item.id }
    })
  }
};

export default useData;