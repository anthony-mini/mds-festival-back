import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): string {
    return this.eventsService.demo();
  }
}

// @ est une annotation (decorator) qui permet de définir une route pour la méthode findAll(). C'est un singloton qui permet de définir une route pour la méthode findAll(). un singloton est une instance unique d'une classe. C'est un concept d'AOP (Aspect Oriented Programming) qui permet de définir des routes pour des méthodes.
