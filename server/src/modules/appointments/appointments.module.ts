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
import { IsOwnerPermission } from '../../common/permissions/isOwner.permission';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [PersonsModule, PrismaModule],
})
export class AppointmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsOwnerPermission).forRoutes({
      path: 'appointments/subscribe',
      method: RequestMethod.POST,
    });
  }
}
