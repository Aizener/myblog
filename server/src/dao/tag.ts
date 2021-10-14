// import { select, update } from './db'
import { getRepository } from "typeorm";
import Tag from "../model/tag";

const tagRepository = () => getRepository(Tag);

const tagDAO = {
  findTagById: async (id: number) => {
    return await tagRepository().findOne(id);
  },
  find: async () => {
    return await tagRepository().find();
  },
  addTag: async (tag: Tag) => {
    return await tagRepository().save(tag);
  },
  updateTag: async (tag: Tag) => {
    return await tagRepository().save(tag);
  },
  saveTag: async (tag: Tag) => {
    return await tagRepository().save(tag);
  },
  removeTag: async (id: number) => {
    return await tagRepository().delete(id);
  }
}

export default tagDAO;
