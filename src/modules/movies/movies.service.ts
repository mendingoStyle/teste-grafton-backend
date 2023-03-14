import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movies } from "database/schemas/movies.entity";
import { PaginationPayloadDto } from "helpers/paginations";
import { Repository } from 'typeorm';
import axios from 'axios'
import { MoviesGetPayloadDto } from "./dto/movies.get";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movies, 'db_read')
        private readonly repoRead: Repository<Movies>,
        @InjectRepository(Movies, 'db_write')
        private readonly repoWrite: Repository<Movies>,
    ) { }

    async importDate(query: PaginationPayloadDto) {
        try {
            const imp = await axios.get(process.env.API_MOVIES + `?page=${query.page > 0 ? query.page : 1}&limit=${query.limit}&year=2006`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Host': process.env.XRAPIDAPIHOST,
                    'X-RapidAPI-Key': process.env.XRAPIDAPIKEY
                },
            })

            let formatSave = []
            for (let i = 0; i < imp?.data?.results?.length; i++) {
                formatSave.push({
                    image: imp?.data?.results[i]?.primaryImage?.url,
                    description: imp?.data?.results[i].primaryImage?.caption?.plainText,
                    title: imp?.data?.results[i]?.titleText?.text,
                    realeaseYear: imp?.data?.results[i]?.releaseYear?.year
                })
            }
            console.log(imp?.data?.results?.length)
            await this.repoWrite.save(formatSave)
        } catch (e) {
            console.log(e)
        }
    }

    async findMany(query: MoviesGetPayloadDto) {

        const [result, count] = await this.repoRead
            .createQueryBuilder()
            .take(query.limit)
            .skip((query.page - 1) * query.limit)
            .getManyAndCount()

        if (query.import) {
            await this.importDate({
                limit: 50,
                page: Math.ceil(count / query.limit),
            })
            return this.findMany({ ...query, import: false })
        }

        return {
            total: count,
            lastPage: Math.ceil(count / query.limit),
            page: query.page,
            limit: query.limit,
            data: result
        }
    }
}