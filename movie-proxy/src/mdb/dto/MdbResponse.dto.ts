import { ApiProperty } from '@nestjs/swagger';

import {MdbMovie} from "./MdbMovie.dto";
import {MdbMovieDetails} from "./MdbMovieDetails.dto";

export class MdbResponseDto {
    @ApiProperty({
        description: 'Current page number',
        example: 1,
    })
    page: number;

    @ApiProperty({
        description: 'List of movies',
        type: [MdbMovie],
    })
    results: MdbMovie[];

    @ApiProperty({
        description: 'Total number of pages',
        example: 10,
    })
    total_pages: number;

    @ApiProperty({
        description: 'Total number of results',
        example: 100,
    })
    total_results: number;
}