// import { select, update } from './db'
import { getRepository } from "typeorm";
import Tag from "../model/tag";

const userRepository = () => getRepository(Tag);

const tagDAO = {
  findTagById: async (id: number) => {
    return await userRepository().findOne(id);
  },
  find: async () => {
    return await userRepository().find();
  },
  addTag: async (tag: Tag) => {
    return await userRepository().save(tag);
  },
  updateTag: async (tag: Tag) => {
    return await userRepository().save(tag);
  },
  saveTag: async (tag: Tag) => {
    return await userRepository().save(tag);
  },
  removeTag: async (id: number) => {
    return await userRepository().delete(id);
  }
}

export default tagDAO;
