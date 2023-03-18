import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { Product } from '../entities/product.entity';
import { Repo } from '../repositories/repo.interface';
import { HTTPError } from '../interfaces/error.js';
const debug = createDebug('ERP:controller:users');
export class ProductsController {
  constructor(public repo: Repo<Product>) {
    debug('Instantiate');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll');
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getById');
      const getId = req.params.id;
      debug(getId);

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
      debug('delete');
      const deleteId = req.params.id;
      debug(deleteId);

      const data = await this.repo.destroy(deleteId);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async countRecords(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('count:get');
      const data = await this.repo.countRecords();
      resp.status(700);
      resp.json({
        count: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
