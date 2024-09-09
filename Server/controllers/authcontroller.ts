import { Request, Response } from 'express';
import AuthService from '../services/authservice';

const authService = new AuthService();


const Login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const result = await authService.login(username, password);
        console.log("in controller", result);
        if (result.token) {
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (error) {
        console.error("Error in Login controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { Login };
