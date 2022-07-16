import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppController } from '../apps/app.controller';
import { PersonsModule } from '../persons/persons.module';

@Module({
  controllers: [AppController],
  providers: [AppointmentsService],
  imports: [PersonsModule],
})
export class AppointmentsModule {}
