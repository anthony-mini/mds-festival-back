import { PartialType } from '@nestjs/mapped-types';
import { CreateFestivalierDto } from './create-festivalier.dto';

export class UpdateFestivalierDto extends PartialType(CreateFestivalierDto) {}
