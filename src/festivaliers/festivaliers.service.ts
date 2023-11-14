import { Injectable } from '@nestjs/common';
import { CreateFestivalierDto } from './dto/create-festivalier.dto';
import { UpdateFestivalierDto } from './dto/update-festivalier.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class FestivaliersService {
  constructor(@InjectDataSource() private bdd: DataSource) {}

  create(createFestivalierDto: CreateFestivalierDto) {
    return this.bdd.query('INSERT INTO festivalier SET ?', [
      createFestivalierDto,
    ]);
  }

  findAll() {
    return this.bdd.query('Select * from festivalier');
  }

  findOne(id_festivalier: number) {
    return this.bdd.query(
      'Select * from festivalier where id_festivalier = ?',
      [+id_festivalier],
    );
  }

  update(id_festivalier: number, updateFestivalierDto: UpdateFestivalierDto) {
    return this.bdd.query('UPDATE festivalier SET ? WHERE id_festivalier = ?', [
      updateFestivalierDto,
      id_festivalier,
    ]);
  }

  remove(id_festivalier: number) {
    return this.bdd.query('DELETE FROM festivalier WHERE id_festivalier = ?', [
      id_festivalier,
    ]);
  }
}
