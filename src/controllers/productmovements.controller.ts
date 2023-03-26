import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';

import { HTTPError } from '../interfaces/error.js';
import { ProductMovementMongoRepo } from '../repositories/productmovements.mongo.repo';
const debug = createDebug('ERP:controller:users');
export class ProductMovementsController {
  constructor(public repo: ProductMovementMongoRepo) {
    debug('Instantiate');
  }

  async analytics(_req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.analytics();
      resp.json({
        results: data,
      });
    } catch (error) {
      throw new HTTPError(400, 'analytics Not found', 'analytics Not found');
      next(error);
    }
  }
}
