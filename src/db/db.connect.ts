import mongoose from 'mongoose';
import { config } from '../config.js';

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = config;

// Export const dbConnect = () => {
//   const uri = `mongodb+srv://${user}:${passwd}@${cluster}/${dbName}?retryWrites=true&w=majority`;
//   return mongoose.connect(uri);
// };

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBName = finalEnv === 'test' ? DB_NAME + '_Testing' : DB_NAME;
  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${finalDBName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
