import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [PrismaModule],
  exports: [PersonsService],
})
export class PersonsModule {}
