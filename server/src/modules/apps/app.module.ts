import {  Module } from '@nestjs/common';
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
import { CachesModule } from '../caches/caches.module';

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
    CachesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
