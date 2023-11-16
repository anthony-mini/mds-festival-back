import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role-user.enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Index({ unique: true })
  @Column({ length: 150 })
  email: string;

  @Index()
  @Column({ length: 150 })
  hash: string;

  @Column({ length: 200 })
  nom: string;

  @Column({ length: 200 })
  prenom: string;

  @Column({ type: 'enum', enum: Role, default: Role.Spectator })
  role: Role;
}
