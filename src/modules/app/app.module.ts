import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { db } from '../../database/config/database'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MoviesModule } from 'modules/movies/movies.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...db,
      host: process.env.DB_READ_HOST,
      name: 'db_read',
    }),
    TypeOrmModule.forRoot({
      ...db,
      host: process.env.DB_WRITE_HOST,
      name: 'db_write',
    }),
    MoviesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
