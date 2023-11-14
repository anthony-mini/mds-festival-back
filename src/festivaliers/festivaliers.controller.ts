import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FestivaliersService } from './festivaliers.service';
import { CreateFestivalierDto } from './dto/create-festivalier.dto';
import { UpdateFestivalierDto } from './dto/update-festivalier.dto';

@Controller('festivaliers')
export class FestivaliersController {
  constructor(private readonly festivaliersService: FestivaliersService) {}

  @Post()
  create(@Body() createFestivalierDto: CreateFestivalierDto) {
    return this.festivaliersService.create(createFestivalierDto);
  }

  @Get()
  findAll() {
    return this.festivaliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivaliersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id_festivalier: number,
    @Body() updateFestivalierDto: UpdateFestivalierDto,
  ) {
    return this.festivaliersService.update(
      +id_festivalier,
      updateFestivalierDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id_festivalier: number) {
    return this.festivaliersService.remove(+id_festivalier);
  }
}
