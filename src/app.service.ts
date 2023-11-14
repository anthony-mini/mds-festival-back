import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// Service est immortel.

// @ injectable() is a decorator that marks a class as available to an injector for instantiation. Cela permet de récupérer une instance de la classe AppService dans le constructeur de la classe AppController.
