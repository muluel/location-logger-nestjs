import { Module } from '@nestjs/common';
import { LocationLogService } from './location-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationLog } from './location-log.entity';
import * as dotenv from 'dotenv';
import { LocationLogController } from './location-log.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([LocationLog]),
    ConfigModule.forRoot(),
  ],
  controllers: [LocationLogController],
  providers: [LocationLogService],
})
export class LocationLogModule {}
