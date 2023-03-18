import { Schema, model } from 'mongoose';
import { ProductMovement } from '../entities/productmovement.entity';

const productMovementSchema = new Schema<ProductMovement>({
  productSku: {
    type: String,
    required: true,
  },
  date: {
    type: String,
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
  unitaryCost: {
    type: Number,
  },
  unitaryPrice: {
    type: Number,
  },
  userCreatorEmail: {
    type: String,
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
