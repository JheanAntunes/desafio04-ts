import { AppDataSource } from "../database";
import { User } from "../entities/User";

import { UserRepository } from "../repository/User-repository";

export class UserService {
  UserRepositoy: UserRepository;

  constructor(UserRepositoy = new UserRepository(AppDataSource.manager)) {
    this.UserRepositoy = UserRepositoy;
  }

  createUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const user = new User(name, email, password);
    return this.UserRepositoy.createUser(user);
  };

  getUser = () => {};
}
