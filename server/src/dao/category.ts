// import { select, update } from './db'
import { getRepository } from "typeorm";
import Category from "../model/category";

const categoryRepository = () => getRepository(Category);

const categoryDAO = {
  findCategoryById: async (id: number) => {
    return await categoryRepository().findOne(id);
  },
  find: async () => {
    return await categoryRepository().find();
  },
  addCategory: async (category: Category) => {
    return await categoryRepository().save(category);
  },
  updateCategory: async (category: Category) => {
    return await categoryRepository().save(category);
  },
  saveCategory: async (category: Category) => {
    return await categoryRepository().save(category);
  },
  removeCategory: async (id: number) => {
    return await categoryRepository().delete(id);
  }
}

export default categoryDAO;
