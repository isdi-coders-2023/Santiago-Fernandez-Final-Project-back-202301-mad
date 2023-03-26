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

  async analytics(): Promise<object> {
    debug('Instantiated at constructor at analytics method');

    const dataActualInventoryCost = await ProductMovementModel.aggregate([
      {
        $addFields: {
          unitsXunitaryCost: {
            $multiply: ['$units', '$costPerUnit'],
          },
        },
      },
      {
        $group: {
          _id: 'Total',
          totalValue: {
            $sum: '$unitsXunitaryCost',
          },
        },
      },
      {
        $addFields: {
          total: {
            $substr: ['$_id', 0, 5],
          },
        },
      },
    ]);

    const dataAnnualInventoryCostVariation =
      await ProductMovementModel.aggregate([
        {
          $addFields: {
            yearOfDate: {
              $substr: ['$Date', 0, 4],
            },
            unitsXunitaryCost: {
              $multiply: ['$units', '$costPerUnit'],
            },
          },
        },
        {
          $group: {
            _id: '$yearOfDate',
            totalValue: {
              $sum: '$unitsXunitaryCost',
            },
          },
        },
        {
          $addFields: {
            yearOfDate: {
              $substr: ['$_id', 0, 4],
            },
          },
        },
        {
          $sort: {
            yearOfDate: 1,
          },
        },
      ]);

    const dataMonthlyInventoryCostVariation =
      await ProductMovementModel.aggregate([
        {
          $addFields: {
            yearOfDate: {
              $substr: ['$Date', 0, 4],
            },
            monthOfDate: {
              $substr: ['$Date', 5, 2],
            },
            dayOfDate: {
              $substr: ['$Date', 8, 2],
            },
            yearMonthOfDate: {
              $substr: ['$Date', 0, 7],
            },
            unitsXunitaryCost: {
              $multiply: ['$units', '$costPerUnit'],
            },
          },
        },
        {
          $group: {
            _id: '$yearMonthOfDate',
            totalValue: {
              $sum: '$unitsXunitaryCost',
            },
          },
        },
        {
          $addFields: {
            yearMonthOfDate: {
              $substr: ['$_id', 0, 7],
            },
          },
        },
        {
          $sort: {
            yearMonthOfDate: 1,
          },
        },
      ]);

    return [
      {
        ActualInventoryCost: dataActualInventoryCost,
        AnnualInventoryCostVariation: dataAnnualInventoryCostVariation,
        MonthlyInventoryCostVariation: dataMonthlyInventoryCostVariation,
      },
    ];
  }
}
