import { Request, Response } from 'express';
import AuthService from "../services/authservice";
import { EmployeeRepository } from "../repositeries/employeerepository";
import BcryptService from "../services/cryptservice";
import JwtService from "../services/jwtservice";
import SessionStore from "../services/sessionstore";

jest.mock('../../repositeries/employeerepository');
jest.mock("../../services/cryptservice");
jest.mock("../../services/jwtservice");
jest.mock("../../services/sessionstore");

describe("AuthService", () => {
  let authService: AuthService;
  let employeeRepository: jest.Mocked<EmployeeRepository>;
  let cryptService: jest.Mocked<BcryptService>;
  let jwtService: jest.Mocked<JwtService>;
  let sessionStore: jest.Mocked<SessionStore>;

  beforeEach(() => {
    employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
    cryptService = new BcryptService() as jest.Mocked<BcryptService>;
    jwtService = new JwtService() as jest.Mocked<JwtService>;
    sessionStore = new SessionStore() as jest.Mocked<SessionStore>;
    authService = new AuthService(employeeRepository, cryptService, sessionStore, jwtService);
  });

  describe("authorize", () => {
    it("should call next when token is valid", async () => {
      const req = {
        headers: {
          authorization: "Bearer mockToken",
        },
        get: jest.fn().mockReturnValue('Bearer mockToken'), // Mocking necessary methods
      } as unknown as Request;
      const res = {} as Response;
      const next = jest.fn();

      jwtService.verify.mockReturnValue({ sessionId: "mockSessionId" });

      await authService.authorize(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 401 when token is not provided", async () => {
      const req = {
        headers: {},
        get: jest.fn().mockReturnValue(null), // Mocking necessary methods
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      await authService.authorize(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    });

    it("should return 401 when token is invalid", async () => {
      const req = {
        headers: {
          authorization: "Bearer invalidToken",
        },
        get: jest.fn().mockReturnValue('Bearer invalidToken'), // Mocking necessary methods
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();

      jwtService.verify.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await authService.authorize(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Failed to authenticate token" });
    });
  });
});
