import { Module } from '@nestjs/common';
import LocationController from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { AreaModule } from '../area/area.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([Location]),
    AreaModule,
    RabbitmqModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
