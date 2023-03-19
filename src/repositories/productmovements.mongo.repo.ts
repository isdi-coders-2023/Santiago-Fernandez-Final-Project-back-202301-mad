import createDebug from 'debug';
import { ProductMovement } from '../entities/productmovement.entity';
import { HTTPError } from '../interfaces/error.js';
import { ProductMovementModel } from './productmovements.mongo.model.js';
const debug = createDebug('ERP:repo:products');

export class ProductMovementMongoRepo {
  private static instance: ProductMovementMongoRepo;

  public static getInstance(): ProductMovementMongoRepo {
    if (!ProductMovementMongoRepo.instance) {
      ProductMovementMongoRepo.instance = new ProductMovementMongoRepo();
    }

    return ProductMovementMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiated at constructor');
  }

  async query(): Promise<ProductMovement[]> {
    debug('Instantiated at constructor at query method');
    const data = await ProductMovementModel.find();
    return data;
  }

  async search(query: {
    key: string;
    value: unknown;
  }): Promise<ProductMovement[]> {
    debug('Instantiated at constructor at search method');
    const data = await ProductMovementModel.find({ [query.key]: query.value });
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug(id);
    const data = await ProductMovementModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }

  async countRecords(): Promise<number> {
    debug('Instantiated at constructor at count method');
    const data = await ProductMovementModel.countDocuments();
    return data;
  }
}
