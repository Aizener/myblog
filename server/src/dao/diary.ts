// import { select, update } from './db'
import { getRepository } from "typeorm";
import Diary from "../model/diary";

const diaryRepository = () => getRepository(Diary);

const diaryDAO = {
  findDiaryById: async (id: number) => {
    return await diaryRepository().findOne(id);
  },
  find: async () => {
    return await diaryRepository().find();
  },
  addDiary: async (diary: Diary) => {
    return await diaryRepository().save(diary);
  },
  updateDiary: async (diary: Diary) => {
    return await diaryRepository().save(diary);
  },
  saveDiary: async (diary: Diary) => {
    return await diaryRepository().save(diary);
  },
  removeDiary: async (id: number) => {
    return await diaryRepository().delete(id);
  }
}

export default diaryDAO;
