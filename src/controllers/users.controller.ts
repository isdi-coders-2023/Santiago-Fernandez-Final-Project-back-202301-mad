import { Response, Request, NextFunction } from 'express';
import createDebug from 'debug';
import { User } from '../entities/user.entity';
import { Repo } from '../repositories/repo.interface';
import { HTTPError } from '../interfaces/error.js';
import { Auth, PayloadToken } from '../services/auth.js';
const debug = createDebug('ERP:controller:users');
export class UsersController {
  constructor(public repo: Repo<User>) {
    debug('Instantiate');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register:post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      req.body.passwd = await Auth.hash(req.body.passwd);
      // Req.body.things = [];
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('login:post');
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');
      if (!(await Auth.compare(req.body.passwd, data[0].passwd)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        role: data[0].role,
        image: data[0].image,
        lastLogging: data[0].lastLogging,
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        results: [token],
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
