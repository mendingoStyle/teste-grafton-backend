import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MoviesService } from "./movies.service";
import { PaginationPayloadDto } from "helpers/paginations";
import { MoviesGetPayloadDto, MoviesResultDto } from "./dto/movies.get";

@ApiTags('Filmes')
@Controller('movies')
export class MoviesController {
    constructor(private readonly service: MoviesService) { }
    @Get()
    findAll(
        @Query() query: MoviesGetPayloadDto,
    ): Promise<MoviesResultDto> {
        return this.service.findMany(query)
    }
}