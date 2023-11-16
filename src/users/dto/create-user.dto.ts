import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

import { Role } from '../enums/role-user.enums';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  prenom: string;

  @IsNotEmpty()
  password: string; // TODO: add password validation

  @IsDefined()
  role: Role;
}
