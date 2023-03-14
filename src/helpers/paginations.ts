import { Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"

export class PaginationPayloadDto {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number = 10

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number = 1
}

export class PaginationResultDto extends PaginationPayloadDto { }