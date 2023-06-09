import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UsersMongoRepo } from '../repositories/users.mongo.repo.js';
import createDebug from 'debug';
import { logged } from '../interceptors/logged.js';
const debug = createDebug('ERP:router:users');

// eslint-disable-next-line new-cap
export const usersRouter = Router();
debug('loaded');

const repo = UsersMongoRepo.getInstance();
const controller = new UsersController(repo);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
usersRouter.get('/count', logged, controller.countRecords.bind(controller));
