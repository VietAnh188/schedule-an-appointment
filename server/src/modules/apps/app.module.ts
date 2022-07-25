import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ImagesModule } from '../images/images.module';
import { LocationsModule } from '../locations/locations.module';
import { AccountsModule } from '../accounts/accounts.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PersonsModule } from '../persons/persons.module';
import { AuthsModule } from '../auths/auths.module';
import { AppointmentsModule } from '../appointments/appointments.module';
import { CachesModule } from '../caches/caches.module';
import { ApiLogMiddleware } from '../../common/middlewares/apiLog.middleware';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            serveRoot: '/public/banners',
            rootPath: path.join(__dirname, '..', '..', '..', 'public', 'banners'),
        }),
        ServeStaticModule.forRoot({
            serveRoot: '/public/locations',
            rootPath: path.join(__dirname, '..', '..', '..', 'public', 'locations'),
        }),
        PrismaModule,
        ImagesModule,
        LocationsModule,
        AccountsModule,
        PersonsModule,
        AuthsModule,
        AppointmentsModule,
        CachesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiLogMiddleware).forRoutes('*');
    }
}
