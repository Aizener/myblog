import { DeleteResult } from 'typeorm';
import categoryDAO from '../dao/category'
import Category from '../model/category'
import { getCurrentDateTime } from '../utils';

const userService = {
  findCategoryById: async (id: number) => {
    return categoryDAO.findCategoryById(id);
  },
  find: async () => {
    return categoryDAO.find();
  },
  addCategory: async (category: Category) => {
    category.createTime = getCurrentDateTime();
    return categoryDAO.saveCategory(category);
  },
  updateCategory: async (category: Category) => {
    return categoryDAO.saveCategory(category);
  },
  removeCategory: async (id: number) => {
    const res: DeleteResult = await categoryDAO.removeCategory(id);
    return res.affected;
  }
}

export default userService;
