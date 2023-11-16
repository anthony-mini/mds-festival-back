import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

// Le controller est mortel, il est sur la couche du haut et reçoit les requêtes HTTP. Il est dépendant du service.
// Le service est immortel, il est sur la couche du bas et contient la logique métier. Il est dépendant du repository.
// Le repository est immortel, il est sur la couche du bas et contient les requêtes SQL. Il est dépendant de l'ORM.
// L'ORM est immortel, il est sur la couche du bas et contient les requêtes SQL. Il est dépendant du driver.
// Le driver est mortel, il est sur la couche du bas et contient les requêtes SQL. Il est dépendant du SGBD.
// Le SGBD est mortel, il est sur la couche du bas et contient les données. Il est dépendant du système d'exploitation.

// controler à besoin du service pour fonctionner, il est dépendant du service. Le service est injecté dans le controller.
