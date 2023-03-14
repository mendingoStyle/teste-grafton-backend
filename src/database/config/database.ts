import 'dotenv/config'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const dbOptions: MysqlConnectionOptions = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_LOGGING === 'true' ?? false,
  port: Number(process.env.DB_PORT),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  database: process.env.DB_DATABASE,
  synchronize: false,
  type: 'mysql',
}

export const db = {
  ...dbOptions,
  host: process.env.DB_WRITE_HOST,
}
