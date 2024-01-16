// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// Importing modules using ES6-style import statements

import 'reflect-metadata';
import { container } from 'tsyringe';
import AuthRepository  from './src/repository/AuthRepository';
import productRoutes from './routes/ProductRoutes';
import authRoutes from './routes/AuthRoutes';
import endexRoutes from './routes/EndexRouters';

import AuthService from './src/service/AuthService';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import AuthController from './src/controller/AuthController';
import EndexService from './src/service/EndexService';
import EndexRepository from './src/repository/EndexRepository';
import EndexController from './src/controller/EndexController';
import AuthValidators from './helpers/validators/AuthValidators';
import TokenAuthenticatorMiddleware from './helpers/jwtMiddleware/TokenAuthenticatorMiddleware';
import EndexValidators from './helpers/validators/EndexValidator';

// // Importing local routes
// import indexRouter from './routes/index';
// import usersRouter from './routes/users';
process.env.TZ = 'UTC';


//dependency injections
container.register(AuthService, { useClass: AuthService });
container.register(AuthRepository, { useClass: AuthRepository });
container.register(AuthController, { useClass: AuthController });

container.register(EndexService, { useClass: EndexService });
container.register(EndexRepository, { useClass: EndexRepository });
container.register(EndexController, { useClass: EndexController });






// container.registerSingleton(AuthRepository);
// container.registerSingleton(AuthService);



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);













//to the route classes
app.use('/product', productRoutes);
app.use('/auth', authRoutes);
app.use('/endex', endexRoutes);



//alternative routes
app.post('/login', AuthValidators.validateLogin, new AuthController().login);
app.post('/signup', AuthValidators.validateRegister, new AuthController().register);
app.post('/register', AuthValidators.validateRegister, new AuthController().register);
//app.post('/logout',new AuthController().logout);
app.post('/endexekleme',new TokenAuthenticatorMiddleware().validateToken(["user"]),  EndexValidators.addvalid, new EndexController().AddEndex);
app.post('/endexsilme',new TokenAuthenticatorMiddleware().validateToken(["user"]),  EndexValidators.removevalid, new EndexController().RemoveEndex);










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
