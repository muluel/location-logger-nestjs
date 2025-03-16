import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';
import { AreaDto } from './area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area) private areaRepository: Repository<Area>,
  ) {}

  async create(data: AreaDto) {
    const closedCoordinates = [...data.coordinates, data.coordinates[0]];

    const polygon = `POLYGON((${closedCoordinates
      .map(({ longitude, latitude }) => `${longitude} ${latitude}`)
      .join(', ')}))`;

    try {
      const result: Area[] = await this.areaRepository.query(
        `INSERT INTO area (name, coordinates) 
         VALUES ($1, ST_GeogFromText($2)) 
         RETURNING id, name, ST_AsGeoJSON(coordinates) AS coordinates;`,
        [data.name, polygon],
      );
      return result[0];
    } catch (err) {
      console.error('Error inserting area:', err);
      throw new Error('Database insertion failed.');
    }
  }

  async findAll(): Promise<AreaDto[]> {
    try {
      return await this.areaRepository.query(
        `SELECT id, name, ST_AsGeoJSON(coordinates) AS coordinates FROM area;`,
      );
    } catch (err) {
      console.error('Error fetching areas:', err);
      throw new Error('Failed to retrieve areas.');
    }
  }

  async isInArea(longitude: number, latitude: number): Promise<Area> {
    try {
      const result: Area[] = await this.areaRepository.query(
        `SELECT * FROM area 
         WHERE ST_Intersects(
           ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
           coordinates
         ) LIMIT 1;`,
        [longitude, latitude],
      );
      return result[0];
    } catch (err) {
      console.error('Error checking point inside area:', err);
      throw new Error('Failed to check area containment.');
    }
  }
}
