import { DeleteResult } from 'typeorm';
import tagDAO from '../dao/tag'
import Tag from '../model/tag'
import { getCurrentDateTime } from '../utils';

const userService = {
  findTagById: async (id: number) => {
    return tagDAO.findTagById(id);
  },
  find: async () => {
    return tagDAO.find();
  },
  addTag: async (tag: Tag) => {
    tag.createTime = getCurrentDateTime();
    return tagDAO.saveTag(tag);
  },
  updateTag: async (tag: Tag) => {
    return tagDAO.saveTag(tag);
  },
  removeTag: async (id: number) => {
    const res: DeleteResult = await tagDAO.removeTag(id);
    return res.affected;
  }
}

export default userService;
