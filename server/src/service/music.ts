import { DeleteResult } from 'typeorm';
import musicDAO from '../dao/music'
import Music from '../model/music'
import { getCurrentDateTime } from '../utils';

const userService = {
  findMusicById: async (id: number) => {
    return musicDAO.findMusicById(id);
  },
  find: async () => {
    return musicDAO.find();
  },
  addMusic: async (music: Music) => {
    music.createTime = getCurrentDateTime();
    return musicDAO.saveMusic(music);
  },
  updateMusic: async (music: Music) => {
    return musicDAO.saveMusic(music);
  },
  removeMusic: async (id: number) => {
    const res: DeleteResult = await musicDAO.removeMusic(id);
    return res.affected;
  }
}

export default userService;
