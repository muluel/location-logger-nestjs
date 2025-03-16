import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LocationLogService } from './location-log.service';
import { LocationLog } from './location-log.entity';

@Controller()
export class LocationLogController {
  constructor(private LocationLogService: LocationLogService) {}

  @EventPattern('log-event')
  async handleLocationMessage(@Payload() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const parsedData: LocationLog = JSON.parse(JSON.stringify(data))['message'];
    await this.LocationLogService.create(
      parsedData.user,
      parsedData.areaId,
      parsedData.entryTime,
    );
  }

  @MessagePattern('get-location-logs')
  async getLocationLogs() {
    return this.LocationLogService.findAll();
  }
}
