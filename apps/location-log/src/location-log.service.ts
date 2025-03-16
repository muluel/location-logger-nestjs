import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationLog } from './location-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationLogService {
  constructor(
    @InjectRepository(LocationLog)
    private LocationLogRepository: Repository<LocationLog>,
  ) {}

  async findAll(): Promise<LocationLog[]> {
    return this.LocationLogRepository.find();
  }

  async create(user, areaId, entryTime) {
    const log = this.LocationLogRepository.create({
      user: user,
      areaId: areaId,
      entryTime: entryTime,
    });
    return this.LocationLogRepository.save(log);
  }
}
