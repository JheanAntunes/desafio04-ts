import { User } from "../entities/User";
import { UserService } from "./UserService";
import * as jwt from "jsonwebtoken";

jest.mock("../repository/User-repository");
jest.mock("../database", () => ({
  inicialize: () => {},
}));

jest.mock("jsonwebtoken");

const mockRepository = require("../repository/User-repository");
const mockUser: User = {
  id_user: "123",
  name: "jhean",
  email: "jhean@gmail.com",
  password: "123456",
};
describe("UserService", () => {
  const userService = new UserService(mockRepository);
  it("Deve adicionar um novo usuário", async () => {
    mockRepository.createUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    const response = await userService.createUser(
      "jhean",
      "jhean@gmail.com",
      "123456"
    );
    expect(mockRepository.createUser).toBeCalled();
    expect(response).toEqual(mockUser);
  });

  it("deveria retornar o token do usuario", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(mockUser));
    jest.spyOn(jwt, "sign").mockImplementation(() => "token");
    const token = await userService.getToken("jhean@gmail.com", "123456");
    expect(token).toEqual("token");
  });

  it("Deve retornar um error, caso não encontre um usuario", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(null));

    await expect(userService.getToken("", "")).rejects.toThrowError(
      "Usuário não encontrado"
    );
  });
});
