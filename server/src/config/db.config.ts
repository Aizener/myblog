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
    'src/model/*.ts'
  ],
  migrations: [
    'src/migrations/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/model',
    migrationsDir: 'src/migrations'
  }
}

export default dbConfig;