import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from, catchError, mergeMap, tap, throwError } from 'rxjs';
import { AreaService } from '../../area/area.service';
import { LocationDto } from '../location.dto';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private areaService: AreaService,
    private rabbitMQService: RabbitMQService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = request.user?.id;
    return next.handle().pipe(
      mergeMap((data: LocationDto) =>
        from(this.areaService.isInArea(data.longitude, data.latitude)).pipe(
          mergeMap((area) => {
            if (area) {
              const message = {
                user: userId,
                areaId: area.id,
                entryTime: data.timestamp,
              };
              return from(
                this.rabbitMQService.emit('log-event', {
                  message,
                }),
              ).pipe(
                tap(() => console.info('Message sent to broker')),
                catchError((err) => {
                  console.error('Error sending message:', err);
                  return throwError(() => err);
                }),
              );
            }
            return from([data]);
          }),
        ),
      ),
      catchError((err) => {
        console.error('Interceptor encountered an error:', err);
        return throwError(() => err);
      }),
    );
  }
}
