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
import { DeniedOwnerMiddleware } from '../../common/middlewares/deniedOwner.middleware';
import { CheckSubscribeMiddleware } from '../../common/middlewares/checkSubscribed.middleware';
import { CheckNotSubscribedMiddleware } from '../../common/middlewares/checkNotSubscribed.middleware';
import { CheckIsOwnerMiddleware } from '../../common/middlewares/checkIsOwner.middleware';

@Module({
    controllers: [AppointmentsController],
    providers: [AppointmentsService],
    imports: [PersonsModule, PrismaModule],
})
export class AppointmentsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /**
         * person is owner of appointment -> denied
         * person isn't owner of appointment -> check person was subscribe this appointment or not, if subscribed -> denied
         */
        consumer
            .apply(DeniedOwnerMiddleware, CheckSubscribeMiddleware)
            .forRoutes({
                path: 'appointments/subscribe',
                method: RequestMethod.POST,
            });
        /**
         * person is owner of appointment -> denied
         * person isn't owner of appointment -> check person was subscribe this appointment or not, if not subscribed -> denied
         */
        consumer
            .apply(DeniedOwnerMiddleware, CheckNotSubscribedMiddleware)
            .forRoutes({
                path: 'appointments/unsubscribe',
                method: RequestMethod.POST,
            });
        /**
         * person isn't owner of appointment -> denied
         */
        consumer
            .apply(CheckIsOwnerMiddleware)
            .forRoutes({
                path: 'appointments',
                method: RequestMethod.DELETE,
            });
    }
}
