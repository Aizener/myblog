import { getConnectionManager, ConnectionManager, Connection } from "typeorm";
import User from '../model/user';
import dbConfig from '../config/db.config'

(async () => {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create(dbConfig);
  
  await connection.connect();
})()