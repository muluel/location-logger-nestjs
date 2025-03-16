import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'locations',
  entities: [`${__dirname}/../src/**/*.entity.{ts,js}`],
  logging: false,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: false,
  migrationsTableName: 'migrations',
};

export default new DataSource(dataSourceOptions);
