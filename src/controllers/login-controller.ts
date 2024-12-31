import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class LoginController {
  userService: UserService;
  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this.userService.getToken(email, password);

      return res.status(200).json(token);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
