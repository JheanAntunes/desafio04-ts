import { EntityManager } from "typeorm";

interface MockManagerReturn {
  saveReturn?: object | [object];
  findOneReturn?: object;
}
export const getMockedEntityManager = async ({
  findOneReturn = undefined,
  saveReturn = undefined,
}: MockManagerReturn): Promise<EntityManager> => {
  const manager: Partial<EntityManager> = {
    save: jest.fn().mockImplementation(() => Promise.resolve(saveReturn)),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(findOneReturn)),
  };
  return manager as EntityManager;
};
