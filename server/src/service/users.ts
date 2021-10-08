import userDAO from '../dao/users'
import User from '../model/user'

const userService = {
  findUserById: (id: number) => {
    return userDAO.findUserById(id);
  },
  addUser: (user: User) => {
    return  userDAO.addUser(user);
  },
  updateUser: () => {
    // userModel.updateUser()
  }
}

export default userService
