import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (request: Request, response: Response): Response => {
    const user = request.body;

    if (!user.name) {
      return response
        .status(400)
        .json({ message: "Bad request! Name obrigatório" });
    }

    if (!user.email) {
      return response
        .status(400)
        .json({ message: "Bad request! Email obrigatório" });
    }

    this.userService.createUser(user.name, user.email);
    return response.status(201).json({ message: "Usuário criado" });
  };

  deleteUser = (request: Request, response: Response) => {
    // TODO
    const user = request.body;
    if (!user.email) {
      return response
        .status(400)
        .json({ message: "Bad request! Email obrigatório" });
    }
    this.userService.deleteUser(user.email);

    return response.status(200).json({ message: "Usuário deletado" });
  };

  getAllUsers = (request: Request, response: Response) => {
    const users = this.userService.getAllUsers();
    return response.status(200).json(users);
  };
}
