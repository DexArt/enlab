import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { MdbService } from './mdb.service';
import { ApiBody, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {MdbDetailsRequestDto, MdbRequestDto} from './dto/MdbRequest.dto';
import {MdbResponseDto} from "./dto/MdbResponse.dto";
import {MdbMovieDetails} from "./dto/MdbMovieDetails.dto";

@Controller('mdb')
export class MdbController {
    constructor(private readonly mdbService: MdbService) {}

    @Post()
    @ApiBody({ type: MdbRequestDto })
    @ApiOkResponse({ type: MdbResponseDto, description: 'List of movies' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request' })
    async getMovies(@Body() mdbRequestDto: MdbRequestDto): Promise<MdbResponseDto> {
        // Validate the request data
        if (!mdbRequestDto.query) {
            return {
                page: 1,
                total_results: 0,
                total_pages: 0,
                results: [],
            };
        }

        try {
            return await this.mdbService.fetchMovies(mdbRequestDto);
        } catch (error) {
            throw new HttpException(
                'Failed to fetch movies',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('details')
    @ApiBody({ type: MdbDetailsRequestDto })
    @ApiOkResponse({ type: MdbMovieDetails, description: 'Movie details' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found' })
    async getMovieById(@Body() mdbDetailsRequestDto: MdbDetailsRequestDto): Promise<MdbMovieDetails> {
        return await this.mdbService.fetchMovieById(mdbDetailsRequestDto.id);
    }
}