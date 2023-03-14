import mongoose from 'mongoose';
import { config } from '../config.js';

const { user, passwd, cluster, dbName } = config;

// Export const dbConnect = () => {
//   const uri = `mongodb+srv://${user}:${passwd}@${cluster}/${dbName}?retryWrites=true&w=majority`;
//   return mongoose.connect(uri);
// };

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBName = finalEnv === 'test' ? dbName + '_Testing' : dbName;
  const uri = `mongodb+srv://${user}:${passwd}@${cluster}/${finalDBName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
