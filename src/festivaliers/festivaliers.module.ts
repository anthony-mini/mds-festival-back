import { Module } from '@nestjs/common';
import { FestivaliersService } from './festivaliers.service';
import { FestivaliersController } from './festivaliers.controller';

@Module({
  controllers: [FestivaliersController],
  providers: [FestivaliersService],
})
export class FestivaliersModule {}
