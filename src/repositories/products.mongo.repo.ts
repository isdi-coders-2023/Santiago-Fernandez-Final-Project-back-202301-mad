import createDebug from 'debug';
import { Product } from '../entities/product.entity';
import { HTTPError } from '../interfaces/error.js';
import { ProductModel } from './products.mongo.model.js';
const debug = createDebug('ERP:repo:products');

export class ProductsMongoRepo {
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

  async getByFilterWithPaginationAndOrder(query: {
    filterField: string;
    filterValue: string;
    filterSet: number;
    filterRecordsPerSet: number;
    orderField: string;
  }): Promise<Product[]> {
    debug('Instantiated at constructor at getByFilterWithPagination method');
    const data = await ProductModel.find({
      [query.filterField]: query.filterValue,
    })
      .skip((query.filterSet - 1) * query.filterRecordsPerSet)
      .limit(query.filterRecordsPerSet)
      .sort(query.orderField);

    return data;
  }

  async queryId(id: string): Promise<Product> {
    debug('Instantiated at constructor at queryId method');
    const data = await ProductModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async leftJoinProductMovements(): Promise<unknown[]> {
    debug('Instantiated at constructor at stockById method');
    const data = await ProductModel.aggregate([
      {
        $lookup: {
          from: 'productmovements',
          localField: 'sku',
          foreignField: 'productSku',
          as: 'resultLeftJoin',
        },
      },
    ]);

    if (!data)
      throw new HTTPError(404, 'Not found', 'Id not found in stockById');
    return data;
  }

  async queryByKey(query: { key: string; value: unknown }): Promise<Product[]> {
    debug('Instantiated at constructor at queryByKey method');
    const data = await ProductModel.find({ [query.key]: query.value });
    if (!data)
      throw new HTTPError(404, 'Not found', 'Value not found in queryByKey');
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

  async countFilteredRecords(query: {
    filterField: string;
    filterValue: string;
  }): Promise<number> {
    debug('Instantiated at constructor at count method');
    const data = await ProductModel.find({
      [query.filterField]: query.filterValue,
    }).countDocuments();
    return data;
  }

  async groupValuesPerField(field: string): Promise<unknown[]> {
    debug('Instantiated at constructor at groupValuesPerField method');
    const data = await ProductModel.aggregate([
      {
        $group: {
          _id: '$' + field,
          value: {
            $min: '$' + field,
          },
        },
      },
    ]);

    if (!data)
      throw new HTTPError(404, 'Not found', 'Id not found in stockById');

    const dataMap = data.map((item: any) => item.value, 'brand');

    return dataMap;
  }
}
