import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { ProductsMongoRepo } from '../repositories/products.mongo.repo.js';
import createDebug from 'debug';
import { logged } from '../interceptors/logged.js';
const debug = createDebug('ERP:router:products');

// eslint-disable-next-line new-cap
export const productsRouter = Router();
debug('loaded');

const repo = ProductsMongoRepo.getInstance();
const controller = new ProductsController(repo);

productsRouter.post(
  '/gallery',
  logged,
  controller.getByFilterWithPaginationAndOrder.bind(controller)
);
productsRouter.get('/:id', logged, controller.getById.bind(controller));
productsRouter.post(
  '/count',
  logged,
  controller.countFilteredRecords.bind(controller)
);
