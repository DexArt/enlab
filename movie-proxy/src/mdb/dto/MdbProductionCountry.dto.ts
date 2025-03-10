import { ApiProperty } from '@nestjs/swagger';

export class MdbProductionCountry {
    @ApiProperty({
        description: 'ISO 3166-1 country code',
        example: 'US',
    })
    iso_3166_1: string;

    @ApiProperty({
        description: 'Country name',
        example: 'United States of America',
    })
    name: string;
}