// import { select, update } from './db'
import { getRepository, Like } from "typeorm";
import Article from "../model/article";

const articleRepository = () => getRepository(Article);

const articleDAO = {
  findArticleById: async (id: number) => {
    return await articleRepository().findOne(id);
  },
  find: async (page: number, size: number, title: string, desc: string) => {
    const conditions: any = {
      take: size,
      skip: (page - 1) * size,
      where: {},
      relations: ['category', 'tags']
    }
    title && (conditions.where.title = Like(`%${title}`));
    desc && (conditions.where.desc = Like(`%${desc}`));

    return await articleRepository().findAndCount(conditions);
  },
  addArticle: async (article: Article) => {
    return await articleRepository().save(article);
  },
  updateArticle: async (article: Article) => {
    return await articleRepository().save(article);
  },
  saveArticle: async (article: Article) => {
    return await articleRepository().save(article);
  },
  removeArticle: async (id: number) => {
    return await articleRepository().delete(id);
  },
  removeArticleMulti: async (ids: number) => {
    return await articleRepository().delete(ids);
  }
}

export default articleDAO;
