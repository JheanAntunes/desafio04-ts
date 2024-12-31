import { AppDataSource } from "../database";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";

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

  getAuthenticatedUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    return this.UserRepositoy.getUserByEmailandPassword(email, password);
  };

  getToken = async (email: string, password: string): Promise<string> => {
    const user = await this.getAuthenticatedUser(email, password);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const tokenData = {
      name: user?.name,
      email: user?.email,
    };

    const tokenKey = "secret";

    const tokenOption = {
      subject: user?.id_user,
    };

    const token = jwt.sign(tokenData, tokenKey, tokenOption);
    return token;
  };
}
