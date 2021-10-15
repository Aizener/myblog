import { DeleteResult } from 'typeorm';
import diaryDAO from '../dao/diary'
import Diary from '../model/diary'
import { getCurrentDateTime } from '../utils';

const userService = {
  findDiaryById: async (id: number) => {
    return diaryDAO.findDiaryById(id);
  },
  find: async () => {
    return diaryDAO.find();
  },
  addDiary: async (diary: Diary) => {
    diary.createTime = getCurrentDateTime();
    return diaryDAO.saveDiary(diary);
  },
  updateDiary: async (diary: Diary) => {
    return diaryDAO.saveDiary(diary);
  },
  removeDiary: async (id: number) => {
    const res: DeleteResult = await diaryDAO.removeDiary(id);
    return res.affected;
  }
}

export default userService;
