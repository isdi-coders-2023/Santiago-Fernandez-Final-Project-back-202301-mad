import createDebug from 'debug';
import { Product } from '../entities/product.entity';
import { HTTPError } from '../interfaces/error.js';
import { Repo } from './repo.interface';
import { ProductModel } from './products.mongo.model.js';
const debug = createDebug('ERP:repo:products');

export class ProductsMongoRepo implements Repo<Product> {
  private static instance: ProductsMongoRepo;

  public static getInstance(): ProductsMongoRepo {
    if (!ProductsMongoRepo.instance) {
      ProductsMongoRepo.instance = new ProductsMongoRepo();
    }

    return ProductsMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiated at constructor');
  }

  async query(): Promise<Product[]> {
    debug('Instantiated at constructor at query method');
    const data = await ProductModel.find();
    return data;
  }

  async queryId(id: string): Promise<Product> {
    debug('Instantiated at constructor at queryId method');
    const data = await ProductModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<Product[]> {
    debug('Instantiated at constructor at search method');
    const data = await ProductModel.find({ [query.key]: query.value });
    return data;
  }

  async create(info: Partial<Product>): Promise<Product> {
    debug('Instantiated at constructor at create method');
    const data = await ProductModel.create(info);
    return data;
  }

  async update(info: Partial<Product>): Promise<Product> {
    debug('Instantiated at constructor at update method');
    const data = await ProductModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Record not found', 'Id not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug(id);
    const data = await ProductModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }

  async countRecords(): Promise<number> {
    debug('Instantiated at constructor at count method');
    const data = await ProductModel.find().count();
    return data;
  }
}
