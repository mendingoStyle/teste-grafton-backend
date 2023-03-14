import { Movies } from "database/schemas/movies.entity"

export class MoviesResultDto {
    total: number
    lastPage: number
    limit: number
    page: number
    data: Movies[]
}
