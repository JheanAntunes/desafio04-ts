import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    deleteUser: jest.fn(),
  };

  const userController = new UserController(mockUserService as UserService);

  it("Deve adicionar um novo usuário", () => {
    const mockRequest = {
      body: {
        name: "Nath",
        email: "nath@test.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário criado",
    });
  });

  it("Verificar a resposta de erro caso o usuário não informe o name", () => {
    const mockRequest = {
      body: {
        email: "nath@test.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Name obrigatório",
    });
  });

  it("Verificar a resposta de erro caso o usuário não informe o email", () => {
    const mockRequest = {
      body: {
        name: "Nath",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Email obrigatório",
    });
  });

  it("Verificar se a função getAllusers está sendo chamada", () => {
    const mockResponse = makeMockResponse();
    const mockRequest = makeMockRequest({});
    userController.getAllUsers(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
  });

  it("Verificar se a função deleteUser está sendo chamada", () => {
    const mockResponse = makeMockResponse();
    const mockRequest = {
      body: {
        name: "Nath",
        email: "nath@test.com",
      },
    } as Request;
    userController.deleteUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
  });

  it("deleteUser: Verificar a resposta de erro caso o usuário não informe o email", () => {
    const mockResponse = makeMockResponse();
    const mockRequest = {
      body: {
        name: "Nath",
      },
    } as Request;
    userController.deleteUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
  });
});
