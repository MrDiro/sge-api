import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const connection = {
  sge_prev: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_MAIN_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_MAIN_NAME,
    autoLoadModels: true,
    synchronize: true
  },
  sge_log: {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_LOG_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_LOG_NAME,
    autoLoadModels: true,
    synchronize: true
  }
}

export { connection };