import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Lieu } from './lieu.entity';

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

  @OneToMany(() => Lieu, (lieu) => lieu.site)
  lieux: Lieu[];
}
