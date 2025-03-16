import { Body, Controller, Get, Post } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaDto } from './area.dto';
import { Area } from './area.entity';

@Controller('area')
export class AreaController {
  constructor(private AreaService: AreaService) {}

  @Post()
  async create(@Body() data: AreaDto): Promise<Area> {
    const area = await this.AreaService.create(data);
    return area;
  }

  @Get()
  async findAll() {
    return await this.AreaService.findAll();
  }
}
