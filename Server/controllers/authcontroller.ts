import { Request, Response } from 'express';
import AuthService from '../services/authservice'

const authService = new AuthService();


const Login = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    authService.login(username, password)
};

export {Login}



