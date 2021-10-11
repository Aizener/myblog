import userDAO from '../dao/users'
import User from '../model/user'

const userService = {
  findUserById: async (id: number) => {
    return userDAO.findUserById(id);
  },
  find: async () => {
    return userDAO.find();
  },
  addUser: async (user: User) => {
    return userDAO.addUser(user);
  },
  updateUser: async (user: User) => {
    return userDAO.updateUser(user);
  },
  removeUser: async (id: number) => {
    return userDAO.removeUser(id);
  }
}

export default userService
