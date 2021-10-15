// import { select, update } from './db'
import { getRepository } from "typeorm";
import Music from "../model/music";

const musicRepository = () => getRepository(Music);

const musicDAO = {
  findMusicById: async (id: number) => {
    return await musicRepository().findOne(id);
  },
  find: async () => {
    return await musicRepository().find();
  },
  addMusic: async (music: Music) => {
    return await musicRepository().save(music);
  },
  updateMusic: async (music: Music) => {
    return await musicRepository().save(music);
  },
  saveMusic: async (music: Music) => {
    return await musicRepository().save(music);
  },
  removeMusic: async (id: number) => {
    return await musicRepository().delete(id);
  }
}

export default musicDAO;
