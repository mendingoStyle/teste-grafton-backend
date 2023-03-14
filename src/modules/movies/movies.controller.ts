import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MoviesService } from "./movies.service";
import { PaginationPayloadDto } from "helpers/paginations";

@ApiTags('Filmes')
@Controller('movies')
export class MoviesController {
    constructor(private readonly service: MoviesService) { }
    @Get()
    findAll(
        @Query() query: PaginationPayloadDto,
    ): Promise<any> {
        return this.service.findMany(query)
    }
}