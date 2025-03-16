import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.locations)
  user: User;

  @Column('geography', { spatialFeatureType: 'Point', srid: 4326 })
  coordinates: string;

  @CreateDateColumn()
  timestamp: Date;
}
