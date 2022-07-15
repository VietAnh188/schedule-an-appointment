import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addToCache(key: string, value: string, ttl: number) {
    await this.cacheManager.set(key, value, { ttl: ttl});
  }

  async getFromCache(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async deleteKey(key: string) {
    await this.cacheManager.del(key);
  }

  async reset() {
    await this.cacheManager.reset();
  }
}
