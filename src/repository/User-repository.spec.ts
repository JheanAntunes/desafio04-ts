import { EntityManager } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "./User-repository";
import { getMockedEntityManager } from "../__mocks__/mock-entity-manager";

describe("UserRepository", () => {
  let userRepository: UserRepository;
  let managerMock: Partial<EntityManager>;
  const mockUser: User = {
    email: "jhean@gmail.com",
    name: "jhean",
    password: "123456",
    user_id: "1",
  };
  beforeAll(async () => {
    managerMock = await getMockedEntityManager({
      saveReturn: mockUser,
    });
    userRepository = new UserRepository(managerMock as EntityManager);
  });

  it("should save a user", async () => {
    const response = await userRepository.createUser(mockUser);
    expect(managerMock.save).toHaveBeenCalled();
    expect(response).toEqual(mockUser);
  });
});
