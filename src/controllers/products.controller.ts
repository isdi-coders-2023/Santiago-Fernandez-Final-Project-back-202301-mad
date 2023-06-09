import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';

import { HTTPError } from '../interfaces/error.js';
import { ProductsMongoRepo } from '../repositories/products.mongo.repo';
const debug = createDebug('ERP:controller:users');
export class ProductsController {
  constructor(public repo: ProductsMongoRepo) {
    debug('Instantiate');
  }

  async getByFilterWithPaginationAndOrder(
    req: Request,
    resp: Response,
    next: NextFunction
  ) {
    try {
      debug('getByFilterWithPaginationAndOrder');
      const data = await this.repo.getByFilterWithPaginationAndOrder(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, resp: Response, next: NextFunction) {
    try {
      const getId = req.params.id;
      const data = await this.repo.queryId(getId);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('create:post');
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('update-method');

      if (!req.params.id)
        throw new HTTPError(404, 'Not found', 'Not found id user in params');

      req.body.id = req.params.id;

      const userData = await this.repo.update(req.body.id);

      resp.status(201);
      resp.json({
        results: [userData],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete-method');
      const deleteId = req.params.id;
      const data = await this.repo.destroy(deleteId);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async countFilteredRecords(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('countFilteredRecords-method');
      const data = await this.repo.countFilteredRecords(req.body);
      resp.status(200);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
