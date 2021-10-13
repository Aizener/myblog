import { DeleteResult } from 'typeorm';
import userDAO from '../dao/users'
import User from '../model/user'
import { getCurrentDateTime } from '../utils';

const userService = {
  findUserById: async (id: number) => {
    return userDAO.findUserById(id);
  },
  find: async () => {
    return userDAO.find();
  },
  addUser: async (user: User) => {
    user.createTime = getCurrentDateTime();
    return userDAO.saveUser(user);
  },
  updateUser: async (user: User) => {
    return userDAO.saveUser(user);
  },
  removeUser: async (id: number) => {
    const res: DeleteResult = await userDAO.removeUser(id);
    return res.affected;
  }
}

export default userService
