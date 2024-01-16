import { Request, Response, NextFunction } from 'express';
import AuthService from '../../src/service/AuthService';
import { container } from 'tsyringe';

export default class TokenAuthenticatorMiddleware {
    validateToken = (requiredRoles?: string[]) => (req: Request, res: Response, next: NextFunction) => {
        let token = req.header('Authorization')?.split(' ')[1] || '';
        if (!token) 
            token = req.header('Authorization') || '';
        
        if (!token) {
            res.status(401).json({ error: 'Unauthorized - Token missing' });
            return
        }

        const decodedToken = container.resolve(AuthService).verifyToken(token);

        if (!decodedToken) {
            res.status(401).json({ error: 'Unauthorized - Invalid token' });
            return
        }
        
        // let validatedRole=false;
        // requiredRoles.forEach(async eachrole=>{
        //     const isvalidate =await container.resolve(AuthService).ValidateRole(decodedToken['user'],eachrole);
        //     if (isvalidate.status)
        //         validatedRole=true
        // })

        // if (!validatedRole) {
        //     res.status(401).json({ error: 'Unauthorized - Invalid role' });
        //     return
        // }

        // Attach user data to the request for further processing
        //req.user = decodedToken;
        next();
    };
}
