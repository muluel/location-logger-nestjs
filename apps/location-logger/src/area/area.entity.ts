import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geography', {
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  coordinates: string;
}
