import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LocationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  areaId: number;

  @CreateDateColumn()
  entryTime: Date;
}
