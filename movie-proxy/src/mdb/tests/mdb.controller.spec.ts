import { Test, TestingModule } from '@nestjs/testing';
import {MdbController} from "../mdb.controller";
import {MdbService} from "../mdb.service";
import {MdbDetailsRequestDto, MdbRequestDto} from "../dto/MdbRequest.dto";
import {MdbResponseDto} from "../dto/MdbResponse.dto";
import {HttpException, HttpStatus} from "@nestjs/common";
import {MdbMovieDetails} from "../dto/MdbMovieDetails.dto";


describe('MdbController', () => {
    let controller: MdbController;
    let service: MdbService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MdbController],
            providers: [
                {
                    provide: MdbService,
                    useValue: {
                        fetchMovies: jest.fn(),
                        fetchMovieById: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<MdbController>(MdbController);
        service = module.get<MdbService>(MdbService);
    });

    describe('getMovies', () => {
        it('should return a default response if query is missing', async () => {
            const mdbRequestDto: MdbRequestDto = { query: '', page: 1 };
            const result: MdbResponseDto = {
                page: 1,
                total_results: 0,
                total_pages: 0,
                results: [],
            };

            expect(await controller.getMovies(mdbRequestDto)).toEqual(result);
        });

        it('should call fetchMovies on the service with valid query', async () => {
            const mdbRequestDto: MdbRequestDto = { query: 'Avengers', page: 1 };
            const result: MdbResponseDto = {
                page: 1,
                total_results: 10,
                total_pages: 1,
                results: [],
            };

            jest.spyOn(service, 'fetchMovies').mockResolvedValue(result);

            expect(await controller.getMovies(mdbRequestDto)).toEqual(result);
            expect(service.fetchMovies).toHaveBeenCalledWith(mdbRequestDto);
        });

        it('should throw an HttpException if fetchMovies fails', async () => {
            const mdbRequestDto: MdbRequestDto = { query: 'Avengers', page: 1 };
            const error = new HttpException('Failed to fetch movies', HttpStatus.INTERNAL_SERVER_ERROR);

            jest.spyOn(service, 'fetchMovies').mockRejectedValue(error);

            await expect(controller.getMovies(mdbRequestDto)).rejects.toThrow(error);
        });
    });

    describe('getMovieById', () => {
        it('should call fetchMovieById on the service with valid id', async () => {
            const mdbDetailsRequestDto: MdbDetailsRequestDto = { id: 12345 };
            const result: MdbMovieDetails = {
                id: 12345,
                title: 'Avengers: Endgame',
                overview: 'After the devastating events of Avengers: Infinity War...',
                poster_path: '/path/to/poster.jpg',
                release_date: '2019-04-26',
                production_companies:[],
                genres:[],
                runtime: 181,
                vote_average: 8.3,
                vote_count: 12500,
                belongs_to_collection: null,
                budget: 356000000,
                revenue: 2797800564,
                imdb_id: 'testid123',
                tagline: 'Part of the journey is the end.',
                original_language: 'en',
                original_title: 'Avengers: Endgame',
                popularity: 50.0,
                status: 'Released',
                backdrop_path: '/path/to/backdrop.jpg',
                homepage: 'https://www.marvel.com/movies/avengers-endgame',
                spoken_languages: [],
                production_countries: [],
                video: false,
                adult: false,
            };

            jest.spyOn(service, 'fetchMovieById').mockResolvedValue(result);

            expect(await controller.getMovieById(mdbDetailsRequestDto)).toEqual(result);
            expect(service.fetchMovieById).toHaveBeenCalledWith(mdbDetailsRequestDto.id);
        });

        it('should throw an HttpException if fetchMovieById fails', async () => {
            const mdbDetailsRequestDto: MdbDetailsRequestDto = { id: 12345 };
            const error = new HttpException('Movie not found', HttpStatus.NOT_FOUND);

            jest.spyOn(service, 'fetchMovieById').mockRejectedValue(error);

            await expect(controller.getMovieById(mdbDetailsRequestDto)).rejects.toThrow(error);
        });
    });
});