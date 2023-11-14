import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SitesService {
  constructor(@InjectRepository(Site) private sites: Repository<Site>) {}
  create(createSiteDto: CreateSiteDto) {
    return 'This action adds a new site';
  }

  findAll() {
    return this.sites.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
