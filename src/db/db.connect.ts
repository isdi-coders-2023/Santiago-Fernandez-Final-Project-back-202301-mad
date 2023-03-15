import mongoose from 'mongoose';
import { config } from '../config.js';
import createDebug from 'debug';

const debug = createDebug('ERP:dbConnect');

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = config;

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBName = finalEnv === 'test' ? DB_NAME + '_Testing' : DB_NAME;
  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${finalDBName}?retryWrites=true&w=majority`;
  debug(uri);
  const forcedUri = `mongodb+srv://sfernandez:12345@cluster0.8eu9jh8.mongodb.net/${finalDBName}?retryWrites=true&w=majority`;
  return mongoose.connect(forcedUri);
};
