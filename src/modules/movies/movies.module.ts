import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesService } from './movies.service'
import { Movies } from 'database/schemas/movies.entity'
import { MoviesController } from './movies.controller'

@Module({
    controllers: [MoviesController],
    providers: [MoviesService],
    imports: [
        TypeOrmModule.forFeature([Movies], 'db_read'),
        TypeOrmModule.forFeature([Movies], 'db_write'),

    ],
    exports: [MoviesService],
})
export class MoviesModule { }
