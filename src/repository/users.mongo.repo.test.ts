import { UsersMongoRepo } from './users.mongo.repo';

describe('Given UsersMongoRepo', () => {
  describe('When instance the class', () => {
    const repoInstance = UsersMongoRepo.getInstance();
    test('Then it should be an instance of the class', async () => {
      expect(repoInstance).toBeInstanceOf(UsersMongoRepo);
    });
  });
});
