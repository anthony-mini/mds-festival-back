import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    @InjectDataSource() private bdd: DataSource,
  ) {}

  @Get()
  findAll() {
    return this.bdd.query('SELECT * FROM evenement');
  }

  @Get(':id')
  findOne(@Param('id') id_evenement: string) {
    return this.bdd.query('SELECT * FROM evenement WHERE id_evenement = ?', [
      +id_evenement,
    ]);
  }

  @Post()
  create(@Body() json) {
    return this.bdd.query('INSERT INTO evenement SET ?', [json]);

    /* Example to test with Postman in body raw JSON : 
    *{
      "id_scene": 1,
      "id_edition": 1,
      "titre": "Concert Ouverture",
      "description": "Le concert d'ouverture du festival",
      "debut": "2023-06-20 16:00:00",
      "fin": "2023-06-20 19:00:00"
    }
    */
  }
}

// @ est une annotation (decorator) qui permet de définir une route pour la méthode findAll(). C'est un singloton qui permet de définir une route pour la méthode findAll(). un singloton est une instance unique d'une classe. C'est un concept d'AOP (Aspect Oriented Programming) qui permet de définir des routes pour des méthodes.
