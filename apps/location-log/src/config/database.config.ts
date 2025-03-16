import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.LOG_DB_NAME || 'logs',
  migrations: [`${__dirname}/../../db/migrations/*.{ts,js}`],
  entities: [`${__dirname}/../*.entity.{ts,js}`],
  synchronize: true,
  logging: true,
  migrationsTableName: 'migrations',
}));
