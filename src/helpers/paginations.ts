import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"

export class PaginationPayloadDto {
    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number = 10

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number = 1
}

export class PaginationResultDto extends PaginationPayloadDto { }