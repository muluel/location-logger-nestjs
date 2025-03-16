import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize } from 'class-validator';

class CoordinatesDto {
  @ApiProperty()
  longitude: number;

  @ApiProperty()
  latitude: number;
}

export class AreaDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [CoordinatesDto] })
  @ArrayMinSize(3)
  coordinates: CoordinatesDto[];
}
