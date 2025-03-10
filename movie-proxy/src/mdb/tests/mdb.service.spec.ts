import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {MdbService} from "../mdb.service";
import {MdbRequestDto} from "../dto/MdbRequest.dto";
import {MdbResponseDto} from "../dto/MdbResponse.dto";
import {MdbMovieDetails} from "../dto/MdbMovieDetails.dto";

jest.mock('axios'); // Mock the axios library

describe('MdbService', () => {
    let service: MdbService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MdbService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            switch (key) {
                                case 'MDB_API_KEY':
                                    return 'test-api-key';
                                case 'MDB_BASE_URL':
                                    return 'https://api.themoviedb.org';
                                case 'MDB_IMAGE_URL':
                                    return 'https://image.tmdb.org/t/p';
                                default:
                                    return '';
                            }
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<MdbService>(MdbService);
        configService = module.get<ConfigService>(ConfigService);
    });

    describe('fetchMovies', () => {
        it('should fetch movies and transform image URLs', async () => {
            const mdbRequestDto: MdbRequestDto = { query: 'Avengers', page: 1 };
            const mockResponse: MdbResponseDto = {
                page: 1,
                total_results: 10,
                total_pages: 1,
                results: [
                    {
                        id: 12345,
                        title: 'Avengers: Endgame',
                        overview: 'After the devastating events of Avengers: Infinity War...',
                        backdrop_path: '/backdrop.jpg',
                        poster_path: '/poster.jpg',
                        release_date: '2019-04-26',
                        genre_ids: [12, 28, 878],
                        adult: false,
                        original_language: 'en',
                        original_title: 'Avengers: Endgame',
                        popularity: 50.0,
                        video: false,
                        vote_average: 8.3,
                        vote_count: 1000,
                    },
                ],
            };

            // Mock axios.get to return the mock response
            (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

            const result = await service.fetchMovies(mdbRequestDto);

            expect(result).toEqual({
                ...mockResponse,
                results: [
                    {
                        ...mockResponse.results[0],
                        backdrop_path: 'https://image.tmdb.org/t/p/backdrop.jpg',
                        poster_path: 'https://image.tmdb.org/t/p/poster.jpg',
                    },
                ],
            });

            expect(axios.get).toHaveBeenCalledWith(
                'https://api.themoviedb.org/3/search/movie?query=Avengers&page=1',
                {
                    headers: {
                        Authorization: 'Bearer test-api-key',
                    },
                },
            );
        });

        it('should throw an HttpException if the request fails', async () => {
            const mdbRequestDto: MdbRequestDto = { query: 'Avengers', page: 1 };

            // Mock axios.get to throw an error
            (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch movies'));

            await expect(service.fetchMovies(mdbRequestDto)).rejects.toThrow(
                new HttpException('Not Found', HttpStatus.NOT_FOUND),
            );
        });
    });

    describe('fetchMovieById', () => {
        it('should fetch movie details and transform image URLs', async () => {
            const id = 12345;
            const mockResponse: MdbMovieDetails = {
                id: 12345,
                title: 'Avengers: Endgame',
                overview: 'After the devastating events of Avengers: Infinity War...',
                backdrop_path: '/backdrop.jpg',
                poster_path: '/poster.jpg',
                release_date: '2019-04-26',
                production_companies: [
                    {
                        id: 1,
                        name: 'Marvel Studios',
                        logo_path: '/logo.jpg',
                        origin_country: 'US',
                    },
                ],
                budget: 356000000,
                revenue: 2797800564,
                genres: [
                    {
                        id: 12,
                        name: 'Adventure',
                    },
                    {
                        id: 28,
                        name: 'Action',
                    },
                    {
                        id: 878,
                        name: 'Science Fiction',
                    },
                ],
                runtime: 181,
                vote_average: 8.3,
                vote_count: 12500,
                belongs_to_collection: null,
                imdb_id: 'testid123',
                homepage: 'https://www.marvel.com/movies/avengers-endgame',
                tagline: 'Part of the journey is the end.',
                original_language: 'en',
                original_title: 'Avengers: Endgame',
                popularity: 50.0,
                status: 'Released',
                spoken_languages: [],
                production_countries: [],
                video: false,
                adult: false,
            };

            // Mock axios.get to return the mock response
            (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

            const result = await service.fetchMovieById(id);

            expect(result).toEqual({
                ...mockResponse,
                backdrop_path: 'https://image.tmdb.org/t/p/backdrop.jpg',
                poster_path: 'https://image.tmdb.org/t/p/poster.jpg',
                production_companies: [
                    {
                        ...mockResponse.production_companies[0],
                        logo_path: 'https://image.tmdb.org/t/p/logo.jpg',
                    },
                ],
            });

            expect(axios.get).toHaveBeenCalledWith(
                'https://api.themoviedb.org/3/movie/12345',
                {
                    headers: {
                        Authorization: 'Bearer test-api-key',
                    },
                },
            );
        });

        it('should throw an HttpException if the request fails', async () => {
            const id = 12345;

            // Mock axios.get to throw an error
            (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch movie details'));

            await expect(service.fetchMovieById(id)).rejects.toThrow(
                new HttpException('Not Found', HttpStatus.NOT_FOUND),
            );
        });
    });
});