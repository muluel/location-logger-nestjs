import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

export class CreateLocationDto {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}

export class LocationDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  timestamp: Date;
}
