import {MdbMovie} from "./MdbMovie.dto";
import {ApiProperty} from "@nestjs/swagger";
import {MdbGenre} from "./MdbGenre.dto";
import {MdbProductionCompany} from "./MdbProductionCompany.dto";
import {MdbProductionCountry} from "./MdbProductionCountry.dto";
import {MdbSpokenLanguage} from "./MdbSpokenLanguage.dto";

const Omit = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Omit<T, typeof keys[number]> => Class;

export class MdbMovieDetails extends Omit(MdbMovie,["genre_ids"]) {
    @ApiProperty({
        description: 'Collection the movie belongs to',
        example: 'Avengers Collection',
        nullable: true,
    })
    belongs_to_collection: string | null;

    @ApiProperty({
        description: 'Movie budget',
        example: 356000000,
    })
    budget: number;

    @ApiProperty({
        description: 'List of genres',
        type: [MdbGenre],
    })
    genres: MdbGenre[];

    @ApiProperty({
        description: 'Movie homepage',
        example: 'https://www.marvel.com/movies/avengers-endgame',
        nullable: true,
    })
    homepage: string | null;

    @ApiProperty({
        description: 'IMDB ID',
        example: 'tt4154796',
    })
    imdb_id: string;

    @ApiProperty({
        description: 'List of production companies',
        type: [MdbProductionCompany],
    })
    production_companies: MdbProductionCompany[];

    @ApiProperty({
        description: 'List of production countries',
        type: [MdbProductionCountry],
    })
    production_countries: MdbProductionCountry[];

    @ApiProperty({
        description: 'Movie revenue',
        example: 2797800564,
    })
    revenue: number;

    @ApiProperty({
        description: 'Movie runtime in minutes',
        example: 181,
    })
    runtime: number;

    @ApiProperty({
        description: 'List of spoken languages',
        type: [MdbSpokenLanguage],
    })
    spoken_languages: MdbSpokenLanguage[];

    @ApiProperty({
        description: 'Movie status',
        example: 'Released',
    })
    status: string;

    @ApiProperty({
        description: 'Movie tagline',
        example: 'Part of the journey is the end.',
        nullable: true,
    })
    tagline: string | null;
}