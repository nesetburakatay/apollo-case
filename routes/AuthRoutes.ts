// import "reflect-metadata";
// import express, { Router } from 'express';
// import AuthController from '../src/controller/AuthController';
// import AuthValidators from '../helpers/validators/AuthValidators';
// import TokenAuthenticatorMiddleware from '../helpers/jwtMiddleware/TokenAuthenticatorMiddleware';

// const router: Router = express.Router();
// const authController: AuthController = new AuthController();

// router.post('/login',AuthValidators.validateLogin, authController.login);
// router.post('/register',AuthValidators.validateRegister,authController.register);

// router.post('/logout', authController.logout);

// export default router;

import express, { Router, Request, Response, NextFunction } from 'express';
import AuthController from '../src/controller/AuthController';
import AuthValidators from '../helpers/validators/AuthValidators';
import { container, injectable } from 'tsyringe';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = container.resolve(AuthController);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/login', AuthValidators.validateLogin, this.authController.login);
    this.router.post('/signup', AuthValidators.validateRegister, this.authController.register);
    this.router.post('/register', AuthValidators.validateRegister, this.authController.register);
    this.router.post('/logout', this.authController.logout);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AuthRouter().getRouter();
