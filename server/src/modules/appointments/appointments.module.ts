import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PersonsModule } from '../persons/persons.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [PersonsModule, PrismaModule],
})
export class AppointmentsModule {}
