import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'fs';
import {dirname} from "path"
import {AppModule} from "./src/app.module";


async function generateSwagger() {
    const app = await NestFactory.create(AppModule);

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Movie API')
        .setDescription('API for fetching movie details and lists')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Define the output file path
    const outputFilePath = './target/api-list.json';

    // Ensure the directory exists
    const outputDir = dirname(outputFilePath);
    mkdirSync(outputDir, { recursive: true });

    // Write Swagger JSON to a file
    writeFileSync(outputFilePath, JSON.stringify(document, null, 2));
    console.log('Swagger JSON file generated successfully!');
}

generateSwagger().catch((err) => {
    console.error('Failed to generate Swagger files:', err);
    process.exit(1);
});