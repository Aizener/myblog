// import { select, update } from './db'
import { getRepository } from "typeorm";
import Article from "../model/article";

const articleRepository = () => getRepository(Article);

const articleDAO = {
  findArticleById: async (id: number) => {
    return await articleRepository().findOne(id);
  },
  find: async () => {
    return await articleRepository().find();
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
  }
}

export default articleDAO;
