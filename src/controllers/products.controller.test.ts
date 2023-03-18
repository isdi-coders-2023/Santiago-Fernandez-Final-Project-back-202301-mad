import { ProductsController } from './products.controller';
import { Request, Response, NextFunction } from 'express';
import { Product } from '../entities/product.entity';
import { Repo } from '../repositories/repo.interface';

describe('Given the product controller', () => {
  const repoMock = {
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countRecords: jest.fn(),
  } as unknown as Repo<Product>;

  const controller = new ProductsController(repoMock);

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;
  const req = {
    body: {
      results: [],
    },
  } as unknown as Request;
  describe('When the getAll method is called', () => {
    test('Then, if everything is correct, the response should have results', async () => {
      await controller.getAll(req, resp, next);
      expect(repoMock.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When the getById method is called', () => {
    test('Then, if everything is correct, the response should have results', async () => {
      await controller.getById(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When the create method is called', () => {
    test('Then, if everything is correct, the response should have results', async () => {
      await controller.create(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When the update method is called', () => {
    test('Then, if everything is correct, the response should have results', async () => {
      await controller.update(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When the delete method is called', () => {
    test('Then, if everything is correct, the response should have results', async () => {
      await controller.delete(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When the countRecords method is called', () => {
    test('Then, if everything is correct, the response should have results', async () => {
      await controller.countRecords(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
