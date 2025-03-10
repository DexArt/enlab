import { Module } from '@nestjs/common';
import { MdbModule } from './mdb/mdb.module';

@Module({
  imports: [MdbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
