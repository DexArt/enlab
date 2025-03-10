import { ApiProperty } from '@nestjs/swagger';

export class MdbSpokenLanguage {
    @ApiProperty({
        description: 'ISO 639-1 language code',
        example: 'en',
    })
    iso_639_1: string;

    @ApiProperty({
        description: 'Language name',
        example: 'English',
    })
    name: string;
}