import express, { Router, Request, Response, NextFunction } from 'express';
import AuthController from '../src/controller/AuthController';
import AuthValidators from '../helpers/validators/AuthValidators';
import { container, injectable } from 'tsyringe';
import EndexValidators from '../helpers/validators/EndexValidator';
import EndexController from '../src/controller/EndexController';
import TokenAuthenticatorMiddleware from '../helpers/jwtMiddleware/TokenAuthenticatorMiddleware';

export class EndexRouter {
  private router: Router;
  private endexController: EndexController;

  constructor() {
    this.router = express.Router();
    this.endexController = container.resolve(EndexController);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/endexekleme',new TokenAuthenticatorMiddleware().validateToken(["custom","admin","user"]),  EndexValidators.addvalid, this.endexController.AddEndex);
  
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new EndexRouter().getRouter();
