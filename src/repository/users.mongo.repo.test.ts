import { UsersMongoRepo } from './users.mongo.repo.js';
import { UserModel } from './users.mongo.model';
import mongoose from 'mongoose';

jest.mock('./users.mongo.model.js');

describe('Given a new UsersMongoRepo created with a public static function (to follow singleton patron)', () => {
  const instanceOfUsersMongoRepo = UsersMongoRepo.getInstance();
  describe('When we call this function ', () => {
    test('Then Users Mongo Repo should be instanciated', () => {
      expect(instanceOfUsersMongoRepo).toBeInstanceOf(UsersMongoRepo);
      mongoose.disconnect();
    });
  });
  describe('When we use the query method', () => {
    test('Then it should return the mocked data', async () => {
      const mock = { id: '2' };
      (UserModel.find as jest.Mock).mockResolvedValue(mock);
      const result = await instanceOfUsersMongoRepo.query();
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toBe(mock);
      mongoose.disconnect();
    });
  });

  describe('When we use the queryId method', () => {
    test('Then it should return the mocked data', async () => {
      const mock = { id: '2' };
      (UserModel.findById as jest.Mock).mockResolvedValue(mock);
      const result = await instanceOfUsersMongoRepo.queryId('2');
      expect(UserModel.findById).toHaveBeenCalled();
      expect(result).toBe(mock);
      mongoose.disconnect();
    });
  });

  describe('When the search method is used', () => {
    test('Then, it should return the searched mocked data', async () => {
      const mock = { id: '2' };
      (UserModel.find as jest.Mock).mockResolvedValue(mock);
      const result = await instanceOfUsersMongoRepo.search({
        key: 'some',
        value: 'xd',
      });
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual(mock);
      mongoose.disconnect();
    });
  });

  describe('When we use the create method', () => {
    test('Then it should return the new mocked data', async () => {
      const mock = { id: '2' };
      (UserModel.create as jest.Mock).mockResolvedValue(mock);
      const result = await instanceOfUsersMongoRepo.create(mock);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result.id).toBe('2');
      mongoose.disconnect();
    });
  });
});
