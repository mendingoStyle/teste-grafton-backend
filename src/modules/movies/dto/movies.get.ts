import { ApiPropertyOptional } from "@nestjs/swagger"
import { Movies } from "database/schemas/movies.entity"
import { PaginationPayloadDto } from "helpers/paginations"

export class MoviesResultDto {
    @ApiPropertyOptional()
    total: number
    @ApiPropertyOptional()
    lastPage: number
    @ApiPropertyOptional()
    limit: number
    @ApiPropertyOptional()
    page: number
    @ApiPropertyOptional()
    data: Movies[]
}


export class MoviesGetPayloadDto extends PaginationPayloadDto {
    @ApiPropertyOptional()
    import?: boolean
}