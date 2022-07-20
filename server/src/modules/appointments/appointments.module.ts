import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PersonsModule } from '../persons/persons.module';
import { PrismaModule } from '../prisma/prisma.module';
import { IsOwnerMiddleware } from '../../common/permissions/isOwner.middleware';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [PersonsModule, PrismaModule],
})
export class AppointmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsOwnerMiddleware).forRoutes({
      path: 'appointments/subscribe',
      method: RequestMethod.POST,
    });
  }
}
