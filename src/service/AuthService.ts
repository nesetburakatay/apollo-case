import "reflect-metadata";
import { ValidateUserResult } from "../entity/dto/ValidateUserResult";
import { User } from "../entity/models/User";
import jwt from 'jsonwebtoken';
import { container, injectable } from "tsyringe";
import  AuthRepository  from "../repository/AuthRepository";

@injectable()
export default class AuthService {
    private secretKey: string = "AFCDAXASTDFTYSAFDYASVYXVASYVYASVXYSAVXYSVAXYSAVXTASVXVSAYXFSA";
    private _authRepository:AuthRepository;

    constructor() {
        this._authRepository=container.resolve(AuthRepository);
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: '1h' }); 
    }

    verifyToken(token: string): object | null {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            return null;
        }
    }

    async ValidateUser(loginUser: User): Promise<ValidateUserResult> {
        
        let tempUser =await this._authRepository.getFirstOrUndefined(x => loginUser.email==x.email);
        
        if (tempUser == undefined)
            return {status:false,message:"unregistered user"};
        
        if (tempUser.password != loginUser.password)
            return {status:false,message:"wrong password"};
           
        let token = this.generateToken({ user: loginUser.email,company:tempUser.company })
        return {status:true,message:token};
    }
    
    async ValidateRole(email:string,role:string):Promise<ValidateUserResult>{
        
        let tempUser =await this._authRepository.getFirstOrUndefined(x => x.email == email);
        
        if (tempUser == undefined)
            return {status:false,message:"unregistered user"};
        
        if (tempUser.role != role)
            return {status:false,message:"unauthenticated role"};

        return {status:true,message:"ok"};
    }

    async register(newUser:User):Promise<ValidateUserResult>{
        
        let tempUser =await this._authRepository.getFirstOrUndefined(x => x.email == newUser.email);
        
        if (tempUser)
            return {status:false,message:"this user name already exist"};
    
        this._authRepository.add({ email: newUser.email, password: newUser.password ,role:"user",company:newUser.company})
        return {status:true,message:"you were registered with default role as user"};
    }
   
}
