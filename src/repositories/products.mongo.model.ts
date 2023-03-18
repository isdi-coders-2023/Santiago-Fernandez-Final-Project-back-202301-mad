import { Schema, model } from 'mongoose';
import { Product } from '../entities/product.entity';

const productSchema = new Schema<Product>({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  ean: {
    type: String,
  },
  brand: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },

  userCreatorId: {
    type: String,
  },
});

productSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const ProductModel = model('Product', productSchema, 'products');
