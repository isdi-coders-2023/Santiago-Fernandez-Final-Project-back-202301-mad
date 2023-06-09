import { ProductsMongoRepo } from './products.mongo.repo.js';
import { ProductModel } from './products.mongo.model';
import mongoose from 'mongoose';

jest.mock('./products.mongo.model.js');

describe('Given a new ProductsMongoRepo created with a public static function (to follow singleton patron)', () => {
  const instanceOfProductsMongoRepo = ProductsMongoRepo.getInstance();
  describe('When we call this function ', () => {
    test('Then Products Mongo Repo should be instanciated', () => {
      expect(instanceOfProductsMongoRepo).toBeInstanceOf(ProductsMongoRepo);
    });
  });

  describe('When we use the queryId method', () => {
    test('Then it should return the mocked data', async () => {
      const mock = { id: '2' };
      (ProductModel.findById as jest.Mock).mockResolvedValue(mock);
      const result = await instanceOfProductsMongoRepo.queryId('2');
      mongoose.disconnect();
      expect(ProductModel.findById).toHaveBeenCalled();
      expect(result).toBe(mock);
    });
  });

  describe('When we use the create method', () => {
    test('Then it should return the new mocked data', async () => {
      const mock = { id: '2' };
      (ProductModel.create as jest.Mock).mockResolvedValue(mock);
      const result = await instanceOfProductsMongoRepo.create(mock);
      expect(ProductModel.create).toHaveBeenCalled();
      expect(result.id).toBe('2');
      mongoose.disconnect();
    });
  });

  describe('When we use the update method to a record that exists', () => {
    test('Then it should update the value at the selected field for the indicated id', async () => {
      (ProductModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        field: 'newvalue',
      });
      const mockUser = {
        id: '1',
        field: 'newvalue',
      };
      const result = await instanceOfProductsMongoRepo.update(mockUser);
      mongoose.disconnect();
      expect(ProductModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({
        id: '1',
        field: 'newvalue',
      });
    });
  });

  describe('When we use the destroy method to a record that does not exists ', () => {
    test('Then it should throw an error of Record not found (see error code assigned in user.mongo.repo.ts', async () => {
      (ProductModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        undefined
      );
      const mockUserId = '1';
      mongoose.disconnect();
      expect(() =>
        instanceOfProductsMongoRepo.destroy(mockUserId)
      ).rejects.toThrow();
      expect(ProductModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('When we use the destroy method to a record that exists', () => {
    test('Then it should delete the record', async () => {
      (ProductModel.findByIdAndDelete as jest.Mock).mockResolvedValue({});
      const mockUserId = '2';
      const result = await instanceOfProductsMongoRepo.destroy(mockUserId);
      mongoose.disconnect();
      expect(ProductModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });

  describe('When we use the update method to a record that does not exists ', () => {
    test('Then it should throw an error of Record not found (see error code assigned in user.mongo.repo.ts', async () => {
      (ProductModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        undefined
      );
      const mockUser = {
        id: '1',
      };
      mongoose.disconnect();
      expect(() =>
        instanceOfProductsMongoRepo.update(mockUser)
      ).rejects.toThrow();
      expect(ProductModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
});
