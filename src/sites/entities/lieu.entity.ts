import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Site } from './site.entity';
import { TypeLieu } from '../enums/type-lieu.enum';

@Entity()
export class Lieu {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_lieu' })
  id: number;

  @Column()
  nom: string;

  @ManyToOne(() => Site, (site) => site.lieux)
  @JoinColumn({ name: 'id_site' })
  site: Site;

  @Index()
  @Column({ name: 'id_type' })
  type: TypeLieu;
}
