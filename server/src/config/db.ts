import { resolve } from 'path';
import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '271019',
  database: 'myblog',
  entities: [
    resolve(__dirname, '../model/*.ts')
  ]
}

export default dbConfig;