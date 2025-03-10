import {ApiProperty} from "@nestjs/swagger";

export class MdbMovie {
    @ApiProperty({
        description: 'Indicates if the movie is for adult audiences',
        example: false,
    })
    adult: boolean;

    @ApiProperty({
        description: 'Backdrop image path',
        example: '/path/to/backdrop.jpg',
    })
    backdrop_path: string;

    @ApiProperty({
        description: 'List of genre IDs associated with the movie',
        example: [28, 12, 16],
        type: [Number],
    })
    genre_ids: number[];

    @ApiProperty({
        description: 'Movie ID',
        example: 12345,
    })
    id: number;

    @ApiProperty({
        description: 'Original language of the movie',
        example: 'en',
    })
    original_language: string;

    @ApiProperty({
        description: 'Original title of the movie',
        example: 'Avengers: Endgame',
    })
    original_title: string;

    @ApiProperty({
        description: 'Movie overview',
        example: 'After the devastating events of Avengers: Infinity War...',
    })
    overview: string;

    @ApiProperty({
        description: 'Popularity score of the movie',
        example: 100.5,
    })
    popularity: number;

    @ApiProperty({
        description: 'Poster image path',
        example: '/path/to/poster.jpg',
    })
    poster_path: string;

    @ApiProperty({
        description: 'Release date of the movie',
        example: '2019-04-26',
    })
    release_date: string;

    @ApiProperty({
        description: 'Title of the movie',
        example: 'Avengers: Endgame',
    })
    title: string;

    @ApiProperty({
        description: 'Indicates if the movie has a video',
        example: false,
    })
    video: boolean;

    @ApiProperty({
        description: 'Average vote score',
        example: 8.5,
    })
    vote_average: number;

    @ApiProperty({
        description: 'Total number of votes',
        example: 15000,
    })
    vote_count: number;
}