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
productsRouter.get(
  '/left-join-productmovements',
  controller.leftJoinProductMovements.bind(controller)
);
productsRouter.post(
  '/count',

  controller.countFilteredRecords.bind(controller)
);

productsRouter.post(
  '/group-values-per-field/:id',
  controller.groupValuesPerField.bind(controller)
);
productsRouter.post('/', controller.create.bind(controller));
productsRouter.get('/:path/:id', controller.getByKey.bind(controller));
productsRouter.get('/:id', controller.getById.bind(controller));
// ProductsRouter.delete('/:path/:id', controller.deleteByKey.bind(controller));
productsRouter.delete('/:id', controller.delete.bind(controller));
