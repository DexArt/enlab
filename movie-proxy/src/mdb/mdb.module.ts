import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MdbController} from "./mdb.controller";
import {MdbService} from "./mdb.service";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [MdbController],
    providers: [MdbService],
})
export class MdbModule {}
