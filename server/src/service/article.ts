import { DeleteResult } from 'typeorm';
import articleDAO from '../dao/article'
import Article from '../model/article'
import { getCurrentDateTime } from '../utils';

const userService = {
  findArticleById: async (id: number) => {
    return articleDAO.findArticleById(id);
  },
  find: async (conditions: any) => {
    const { page, size, title, desc, category } = conditions;
    return articleDAO.find(page, size, title, desc, category);
  },
  addArticle: async (article: Article) => {
    article.createTime = getCurrentDateTime();
    return articleDAO.saveArticle(article);
  },
  updateArticle: async (article: Article) => {
    return articleDAO.saveArticle(article);
  },
  removeArticle: async (id: number) => {
    const res: DeleteResult = await articleDAO.removeArticle(id);
    return res.affected;
  },
  removeArticleMulti: async (ids: number) => {
    const res: DeleteResult = await articleDAO.removeArticleMulti(ids);
    return res.affected;
  }
}

export default userService;
