import { Schema, model } from 'mongoose';
import { ProductMovement } from '../entities/productmovement.entity';

const productMovementSchema = new Schema<ProductMovement>({
  productSku: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
  typeId: {
    type: String,
  },
  units: {
    type: Number,
  },
  costPerUnit: {
    type: Number,
  },
  pricePerUnit: {
    type: Number,
  },
});

productMovementSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const ProductMovementModel = model(
  'ProductMovement',
  productMovementSchema,
  'productMovements'
);
