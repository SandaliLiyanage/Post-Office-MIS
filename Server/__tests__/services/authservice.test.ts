import { Request, Response, NextFunction } from 'express';
import AuthService from '../../services/authservice';
import JwtService from '../../services/jwtservice';

jest.mock('../../services/jwtservice');  // Correct path for mocking JwtService

describe('AuthService', () => {
    
    let authService: AuthService;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        authService = new AuthService();
        
        // Initialize req with headers to avoid undefined issue
        req = {
            headers: {}
        };
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should return 401 if no token is provided', async () => {
        // Execute authorize method
        await authService.authorize(req as Request, res as Response, next);

        // Assert that the response status and json are set correctly
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
    });

    it('should return 401 if token verification fails', async () => {
        req.headers!.authorization = 'Bearer invalidtoken';

        // Mock JwtService verify to throw an error
        (JwtService.prototype.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        // Execute authorize method
        await authService.authorize(req as Request, res as Response, next);

        // Assert that the response status and json are set correctly
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to authenticate token' });
    });

    it('should call next if token is valid', async () => {
        req.headers!.authorization = 'Bearer validtoken';

        // Mock JwtService verify to return a valid token payload
        (JwtService.prototype.verify as jest.Mock).mockReturnValue({ sessionId: '123' });

        // Execute authorize method
        await authService.authorize(req as Request, res as Response, next);

        // Assert that next() has been called, indicating successful authorization
        expect(next).toHaveBeenCalled();
    });
});
