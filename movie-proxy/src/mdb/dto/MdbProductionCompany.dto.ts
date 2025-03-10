// src/types/mdb-production-company.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class MdbProductionCompany {
    @ApiProperty({ description: 'Company ID', example: 12345 })
    id: number;

    @ApiProperty({ description: 'Company name', example: 'Marvel Studios' })
    name: string;

    @ApiProperty({
        description: 'Logo image path',
        example: '/path/to/logo.png',
        nullable: true,
    })
    logo_path: string | null;

    @ApiProperty({
        description: 'Origin country',
        example: 'US',
    })
    origin_country: string;
}