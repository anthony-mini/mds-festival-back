import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
