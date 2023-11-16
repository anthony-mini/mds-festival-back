import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role-user.enums';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Index({ unique: true })
  @Column({ length: 150 })
  email: string;

  @Index()
  @Exclude()
  @Column({ length: 150 })
  hash: string;

  @Column({ length: 200 })
  nom: string;

  @Column({ length: 200 })
  prenom: string;

  @Column({ type: 'enum', enum: Role, default: Role.Spectator })
  role: Role;
}
