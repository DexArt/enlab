import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";

export class MdbRequestDto {
    @ApiProperty({
        required: false,
        description: 'Search query for movies',
        example: 'Avengers',
    })
    @IsNotEmpty({message: 'Query is required'})
    @IsString({message: 'Query must be a string'})
    query: string;

    @ApiProperty({
        required: false,
        description: 'Page number for pagination',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @IsNumber({},{message: 'Page number must be a number'})
    @Min(1,{message: 'Page number must be a positive number'})
    page?: number;
}

export class MdbDetailsRequestDto {
    @ApiProperty({
        required: true,
        description: 'Movie ID',
        example: 12345,
    })
    @IsNotEmpty({message: 'ID is required'})
    @IsNumber({}, {message: 'ID must be a number'})
    @Min(1,{message: 'ID must be a positive number'})
    id: number;
}