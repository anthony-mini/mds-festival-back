import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Entity présentes des données persistantes.

@Entity()
export class Site {
  @PrimaryGeneratedColumn({ name: 'id_site' })
  id: number;

  @Column()
  nom: string;

  @Column()
  image: string;

  @Column()
  capacite: number;
}
