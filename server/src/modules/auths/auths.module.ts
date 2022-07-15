import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { AccountsModule } from '../accounts/accounts.module';
import { PersonsModule } from '../persons/persons.module';
import { CachesModule } from '../caches/caches.module';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
  imports: [AccountsModule, PersonsModule, CachesModule],
})
export class AuthsModule {}
