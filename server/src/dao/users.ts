// import { select, update } from './db'
import { getRepository } from "typeorm";
import User from "../model/user";

const userRepository = () => getRepository(User);

const userDAO = {
  findUserById: async (id: number) => {
    return await userRepository().findOne(id);
  },
  find: async () => {
    return await userRepository().find();
  },
  addUser: async (user: User) => {
    return await userRepository().save(user);
  },
  updateUser: async (user: User) => {
    return await userRepository().save(user);
  },
  removeUser: async (id: number) => {
    return await userRepository().delete(id);
  }
}

export default userDAO
