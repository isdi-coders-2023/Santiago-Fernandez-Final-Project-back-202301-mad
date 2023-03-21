import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { ProductsMongoRepo } from '../repositories/products.mongo.repo.js';
import createDebug from 'debug';
const debug = createDebug('ERP:router:products');

// eslint-disable-next-line new-cap
export const productsRouter = Router();
debug('loaded');

const repo = ProductsMongoRepo.getInstance();
const controller = new ProductsController(repo);

productsRouter.get(
  '/gallery',
  controller.getByFilterWithPaginationAndOrder.bind(controller)
);
productsRouter.get('/count', controller.countFilteredRecords.bind(controller));
