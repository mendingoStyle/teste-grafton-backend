import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movies } from "database/schemas/movies.entity";
import { PaginationPayloadDto } from "helpers/paginations";
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movies, 'db_read')
        private readonly repoRead: Repository<Movies>,
    ) { }

    async findMany(query: PaginationPayloadDto) {
        const movies = await this.repoRead
            .createQueryBuilder()
            .take(query.limit)
            .skip((query.page - 1) * query.limit)
            .getManyAndCount()
        console.log(movies)

        return null
    }
}