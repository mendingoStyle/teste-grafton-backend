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
    ],
    exports: [MoviesService],
})
export class MoviesModule { }
