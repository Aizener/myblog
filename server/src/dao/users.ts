// import { select, update } from './db'
import { getRepository } from "typeorm";
import User from "../model/user";

const userRepository = () => getRepository(User);

const userDAO = {
  findUserById: async (id: number) => {
    return await userRepository().findOne(id)
  },
  addUser: async (user: User) => {
    return await userRepository().save(user)
  }
}

export default userDAO
