import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * Prod конфиг БД.
 */
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.FUKS_BLOG_BACKEND_POSTGRES_HOST,
  port: 5_432,
  synchronize: false,
  database: 'blog',
  username: process.env.FUKS_BLOG_BACKEND_POSTGRES_USER,
  password: process.env.FUKS_BLOG_BACKEND_POSTGRES_PASSWORD,
  entities: ['**/entities/**/*.ts'],
  migrationsTableName: 'migration',
  migrations: ['src/__migration__/*.ts'],
};

const devDataSource = new DataSource(ormConfig);

/**
 * Конфиг, описывающий схему БД для миграций.
 */
export default devDataSource;
