import { Request, Response, NextFunction } from 'express';
import { LoginUserDTO } from '../../src/entity/dto/LoginUserDTO';

export default class AuthValidators {
  public static validateLogin(req: Request, res: Response, next: NextFunction): void {
    const loginUser: LoginUserDTO = req.body
    
    if (!loginUser.email || !loginUser.password) {
      res.status(400).json({ error: ' --email-- and --password-- are required' });
      return
    }
    
    next();
  }
  public static validateRegister(req: Request, res: Response, next: NextFunction): void {
    const reqUser: LoginUserDTO = req.body
    
    if (!reqUser.email || !reqUser.password || !reqUser.company) {
      res.status(400).json({ error: '--email-- , --password-- and --company-- are required' });
      return
    }
    
    // if (reqUser.username.length<8) {
    //   res.status(400).json({ error: 'user name has to be min 8 char' });
    // }
    
    next();
  }
}