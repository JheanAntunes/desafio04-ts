import { UserController } from "./UserController";
import { UserService } from "../services/UserService";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

jest.mock("../services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        createUser: jest.fn(),
        getUser: jest.fn(),
      };
    }),
  };
});

describe("UserController", () => {
  const userController = new UserController();

  it("Deve adicionar um novo usuário", () => {
    const mockRequest = {
      body: {
        name: "Nath",
        email: "nath@test.com",
        password: "123",
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
        password: "123",
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
        password: "123",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Email obrigatório",
    });
  });

  it("Verificar a resposta de erro caso o usuário não informe o password", () => {
    const mockRequest = {
      body: {
        name: "Nath",
        email: "nath@gmail.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! password obrigatório",
    });
  });

  it("Deve retornar o usuario com o userId informado", () => {
    const mockRequest = makeMockRequest({
      params: {
        id: "1",
      },
    });
    const mockResponse = makeMockResponse();
    userController.getUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
  });
});
