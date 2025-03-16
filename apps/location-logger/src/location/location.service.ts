import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto, LocationDto } from './location.dto';
import { User } from '../user/user.entity';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { config } from 'dotenv';

config();

@Injectable()
export class LocationService implements OnModuleInit {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}
  private logClient: ClientProxy;

  onModuleInit() {
    this.logClient = ClientProxyFactory.create({
      options: {
        transport: Transport.TCP,
        host: process.env.LOG_SERVICE_HOST,
        port: process.env.LOG_SERVICE_PORT,
      },
    });
  }

  async getLocationLogs() {
    return await this.logClient.send('get-location-logs', {}).toPromise();
  }

  async create(
    locationDto: CreateLocationDto,
    user: User,
  ): Promise<LocationDto> {
    const point = `POINT(${locationDto.longitude} ${locationDto.latitude})`;
    const timestamp = new Date().toISOString();
    const result: Location[] = await this.locationRepo.query(
      `INSERT INTO location ("userId", coordinates, timestamp)
      VALUES ($1, ST_GeogFromText($2), $3)
      RETURNING id, "userId" as user, ST_AsGeoJSON(coordinates) as coordinates, timestamp`,
      [user.id, point, timestamp],
    );
    const geoJSON = JSON.parse(result[0].coordinates);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const [longitude, latitude] = geoJSON.coordinates;
    const responseDto = new LocationDto();
    responseDto.user = result[0].user;
    responseDto.longitude = longitude;
    responseDto.latitude = latitude;
    responseDto.timestamp = result[0].timestamp;
    return responseDto;
  }

  async find(user: User): Promise<Location[]> {
    const items = await this.locationRepo.find({ where: { user: user } });
    return items;
  }
}
