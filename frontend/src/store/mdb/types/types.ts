import {MdbMovie, MdbMovieDetails, MdbRequestDto, MdbResponseDto} from "api";

export interface MdbStateSchema {
    movies: {
        currentPage: number,
        moviesPerPage: number,
        pagedMovies: MdbMovie[][],
        totalPages: number,
        request: MdbRequestDto,
        response: MdbResponseDto,
        error: Error | null,
        loading: boolean,
    },
    movieDetails: MdbMovieDetails | null,
}