import { Router } from 'express';
import { ProductMovementsController } from '../controllers/productmovements.controller.js';
import { ProductMovementMongoRepo } from '../repositories/productmovements.mongo.repo.js';
import createDebug from 'debug';
import { logged } from '../interceptors/logged.js';
const debug = createDebug('ERP:router:products');

// eslint-disable-next-line new-cap
export const productMovementsRouter = Router();
debug('loaded');

const repo = ProductMovementMongoRepo.getInstance();
const controller = new ProductMovementsController(repo);

productMovementsRouter.get(
  '/analytics',

  controller.analytics.bind(controller)
);
