import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.LOG_DB_NAME || 'logs',
  entities: [`${__dirname}/../*.entity.{ts,js}`],
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: true,
  migrationsTableName: 'migrations',
};

export default new DataSource(dataSourceOptions);
