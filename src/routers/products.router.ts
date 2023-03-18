import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { ProductsMongoRepo } from '../repositories/products.mongo.repo.js';
import createDebug from 'debug';
import { logged } from '../interceptors/logged.js';
const debug = createDebug('ERP:router:users');

// eslint-disable-next-line new-cap
export const productsRouter = Router();
debug('loaded');

const repo = ProductsMongoRepo.getInstance();
const controller = new ProductsController(repo);

productsRouter.get('/count', controller.countRecords.bind(controller));
