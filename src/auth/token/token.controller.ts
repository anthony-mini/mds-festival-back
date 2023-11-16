import {
  Controller,
  Headers,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in-dto';
import * as bcrypt from 'bcryptjs';

@Controller('auth/token')
export class TokenController {
  constructor(
    private users: UsersService,
    private jwts: JwtService,
  ) {}

  @Get()
  async signIn(@Headers('Authorization') auth: string) {
    // Vérifier que l'en-tête d'autorisation a été fourni
    if (!auth) {
      throw new UnauthorizedException('Missing authorization header');
    }

    // Décoder l'en-tête d'autorisation pour obtenir les identifiants de l'utilisateur
    const [authType, encoded] = auth.split(' ');
    if (authType !== 'Basic' || !encoded) {
      throw new UnauthorizedException('Bad authorization header format');
    }
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [email, password] = decoded.split(':');

    // Vérifier que les deux valeurs d'email et de mot de passe ont bien été extraites
    if (!email || !password) {
      throw new UnauthorizedException('Invalid authorization credentials');
    }

    // Utiliser UsersService pour vérifier si l'utilisateur existe
    const user = await this.users.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.hash))) {
      // Créer et renvoyer le DTO de connexion si les identifiants sont valides
      const cr = new SignInDto();
      cr.expires_in = 3600; // Expiration du token dans une heure
      cr.access_token = this.jwts.sign(
        {
          id: user.id,
          role: user.role,
        },
        {
          subject: email,
          expiresIn: '1h', // Expiration du token configurée sur une heure
        },
      );

      return cr;
    }
    throw new UnauthorizedException('Invalid authorization credentials');
  }
}
