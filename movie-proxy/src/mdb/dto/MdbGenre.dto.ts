import { ApiProperty } from '@nestjs/swagger';

export class MdbGenre {
    @ApiProperty({ description: 'Genre ID', example: 11 })
    id: number;

    @ApiProperty({ description: 'Genre name', example: 'Action' })
    name: string;
}