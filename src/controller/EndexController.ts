import "reflect-metadata";
import { Request, Response } from "express";
import AuthService from "../service/AuthService";
import { User } from "../entity/models/User";
import { injectable, container, inject, autoInjectable } from "tsyringe";
import { LoginUserDTO } from "../entity/dto/LoginUserDTO";
import { RegisterUserDTO } from "../entity/dto/RegisterUserDTO";
import { EndexDTO } from "../entity/dto/EndexDTO";
import EndexService from "../service/EndexService";
import { Endex } from "../entity/models/Endex";
import { RemoveEndexDTO } from "../entity/dto/RemoveEndexDto";

@injectable()
export default class EndexController {

    public async AddEndex(req: Request, res: Response): Promise<void> {

        const reqEndex: EndexDTO = req.body

        let token = req.header('Authorization')?.split(' ')[1] || '';
        if (!token)
            token = req.header('Authorization') || '';
        if (!token) {
            res.status(401).json({ error: 'Unauthorized - Token missing' });
            return
        }

        const decodedToken = container.resolve(AuthService).verifyToken(token);
        

       
        
        let insertDate=new Date(reqEndex.endexdate);
        insertDate.setHours(0, 0, 0, 0);

        let tempEndex = new Endex(
            reqEndex.endexvalue,
            insertDate,
            decodedToken['user'],
            decodedToken['company']
        );
        
        let endexlist =await container.resolve(EndexService).AddEndex(tempEndex);

        res.status(200).json(endexlist);

        // if (isvalid.status)
        //     res.status(200).json({ message: isvalid.message });
        // else
        //     res.status(403).json({ error: isvalid.message });
    }
    public async RemoveEndex(req: Request, res: Response): Promise<void> {
        const reqRemoveEndex: RemoveEndexDTO = req.body

        let token = req.header('Authorization')?.split(' ')[1] || '';
        if (!token)
            token = req.header('Authorization') || '';
        if (!token) {
            res.status(401).json({ error: 'Unauthorized - Token missing' });
            return
        }
        const decodedToken = container.resolve(AuthService).verifyToken(token);
        
        
        let insertDate=new Date(reqRemoveEndex.endexdate);
        insertDate.setHours(0, 0, 0, 0);

        let tempEndex = new Endex(
            null,
            insertDate,
            decodedToken['user'],
            decodedToken['company']
        );
        
        let endexlist =await container.resolve(EndexService).RemoveEndex(tempEndex);

        res.status(200).json(endexlist);

        // if (isvalid.status)
        //     res.status(200).json({ message: isvalid.message });
        // else
        //     res.status(403).json({ error: isvalid.message });
    }
}


