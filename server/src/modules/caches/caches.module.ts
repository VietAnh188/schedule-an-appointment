import { Module, CacheModule } from '@nestjs/common';
import { CachesService } from './caches.service';

@Module({
  imports: [CacheModule.register()],
  providers: [CachesService],
  exports: [CachesService],
})
export class CachesModule {}
