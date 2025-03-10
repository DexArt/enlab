import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import axios from "axios";
import {MdbRequestDto} from "./dto/MdbRequest.dto";
import {MdbResponseDto} from "./dto/MdbResponse.dto";
import {MdbMovieDetails} from "./dto/MdbMovieDetails.dto";

@Injectable()
export class MdbService {
    private readonly MDB_API_KEY: string;
    private readonly MDB_BASE_URL: string;
    private readonly MDB_IMAGE_URL: string;

    constructor(private configService: ConfigService) {
        this.MDB_API_KEY = this.configService.get<string>('MDB_API_KEY') || "";
        this.MDB_BASE_URL = this.configService.get<string>('MDB_BASE_URL') || "";
        this.MDB_IMAGE_URL = this.configService.get<string>('MDB_IMAGE_URL') || "";
    }


    async fetchMovies({query, page = 1}: MdbRequestDto): Promise<MdbResponseDto> {
        const finalQuery = query?.trim().replace(/\s/g, '+') || "";
        const url = `${this.MDB_BASE_URL}/3/search/movie?query=${finalQuery}&page=${page}`;

        try {
            const response: {data: MdbResponseDto} = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.MDB_API_KEY}`
                }
            });
            response.data.results = response.data.results.map((movie) => {
                return {
                    ...movie,
                    backdrop_path: movie.backdrop_path ? `${this.MDB_IMAGE_URL}${movie.backdrop_path}` : movie.backdrop_path,
                    poster_path: movie.poster_path ? `${this.MDB_IMAGE_URL}${movie.poster_path}` : movie.poster_path,
                };
            });
            return response.data;
        } catch (error) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    async fetchMovieById(id: number): Promise<MdbMovieDetails> {

        const url = `${this.MDB_BASE_URL}/3/movie/${id}`;
        try {
            const response:{data: MdbMovieDetails} = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.MDB_API_KEY}`
                }
            });
            response.data = {
                ...response.data,
                backdrop_path: response.data.backdrop_path ? `${this.MDB_IMAGE_URL}${response.data.backdrop_path}` : response.data.backdrop_path,
                poster_path: response.data.poster_path ? `${this.MDB_IMAGE_URL}${response.data.poster_path}` : response.data.poster_path,
                production_companies: response.data.production_companies.map((company) => {
                    return {
                        ...company,
                        logo_path: company.logo_path ? `${this.MDB_IMAGE_URL}${company.logo_path}` : company.logo_path,
                    };
                })
            }
            return response.data;
        } catch (error) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
}
