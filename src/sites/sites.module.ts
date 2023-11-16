import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Lieu } from './entities/lieu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Site, Lieu])],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
