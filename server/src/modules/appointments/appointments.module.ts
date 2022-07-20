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
import { CheckIsOwnerMiddleware } from '../../common/middlewares/checkIsOwner.middleware';
import { CheckHasSubscribeMiddleware } from '../../common/middlewares/checkHasSubscribed.middleware';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [PersonsModule, PrismaModule],
})
export class AppointmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckIsOwnerMiddleware, CheckHasSubscribeMiddleware)
      .forRoutes({
        path: 'appointments/subscribe',
        method: RequestMethod.POST,
      });
  }
}
