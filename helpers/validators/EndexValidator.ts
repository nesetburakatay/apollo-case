import { Request, Response, NextFunction } from 'express';
import { EndexDTO } from '../../src/entity/dto/EndexDTO';

export default class EndexValidators {
  public static addvalid(req: Request, res: Response, next: NextFunction): void {
    
    const reqEndex: EndexDTO = req.body

    if (!reqEndex.endexdate || !reqEndex.endexvalue) {
      res.status(400).json({ error: '--endexvalue-- : as number and --endexdate-- : (YYYY-MM-DD) as string, are required' });
      return
    }

    next();
  }
  public static removevalid(req: Request, res: Response, next: NextFunction): void {

    const reqEndex: EndexDTO = req.body

    if (!reqEndex.endexdate) {
      res.status(400).json({ error: '--endexdate-- : (YYYY-MM-DD) as string, are required' });
      return
    }

    next();
  }


 
}