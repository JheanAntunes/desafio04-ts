import { User } from "../entities/User";
import { UserService } from "./UserService";

jest.mock("../repository/User-repository");
jest.mock("../database", () => ({
  inicialize: () => {},
}));

const mockRepository = require("../repository/User-repository");

describe("UserService", () => {
  const userService = new UserService(mockRepository);
  it("Deve adicionar um novo usuário", async () => {
    mockRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        user_id: "123",
        name: "jhean",
        email: "jhean@gmail.com",
        password: "123456",
      })
    );
    const response = await userService.createUser(
      "jhean",
      "jhean@gmail.com",
      "123456"
    );
    expect(mockRepository.createUser).toBeCalled();
    expect(response).toEqual({
      user_id: "123",
      name: "jhean",
      email: "jhean@gmail.com",
      password: "123456",
    });
  });
});
