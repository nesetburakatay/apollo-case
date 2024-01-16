import "reflect-metadata";
import { Request, Response } from "express";
import AuthService from "../service/AuthService";
import { User } from "../entity/models/User";
import { injectable, container, inject, autoInjectable } from "tsyringe";
import { LoginUserDTO } from "../entity/dto/LoginUserDTO";
import { RegisterUserDTO } from "../entity/dto/RegisterUserDTO";

@injectable()
export default class AuthController { 

    public async login(req: Request, res: Response): Promise<void> {
        const loginUser: LoginUserDTO = req.body
        let tempUser = new User(loginUser.email, loginUser.password);
        
        //if it false returns false message. if it true returns token
        let isvalid =await container.resolve(AuthService).ValidateUser(tempUser);
        if (isvalid.status)
            res.status(200).json({ token: isvalid.message });
        else
            res.status(403).json({ error: isvalid.message });
    }
    public async register(req: Request, res: Response): Promise<void> {
        const reqUser: RegisterUserDTO = req.body
        let tempUser = new User(reqUser.email, reqUser.password,reqUser.company)

        let isregistered =await container.resolve(AuthService).register(tempUser);
        res.json({ message: isregistered.message });
    }
    public logout(req: Request, res: Response): void {
        // In a real application, you would invalidate the authentication token.
        res.json({ message: "User logged out successfully" });
    }
}


