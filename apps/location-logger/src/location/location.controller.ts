import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateLocationDto, LocationDto } from './location.dto';
import { LocationService } from './location.service';
import { UserDecorator } from '../user/user.decorator';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Location } from './location.entity';

@Controller()
export default class LocationController {
  constructor(private LocationService: LocationService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  @Post('locations')
  @ApiCreatedResponse()
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @UserDecorator() user: User,
  ) {
    return await this.LocationService.create(createLocationDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('locations')
  @ApiOkResponse({ type: [LocationDto] })
  async findAll(@UserDecorator() user: User): Promise<Location[]> {
    return await this.LocationService.find(user);
  }

  @Get('logs')
  async logs() {
    return await this.LocationService.getLocationLogs();
  }
}
