import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [PrismaModule],
  exports: [AccountsService],
})
export class AccountsModule {}
