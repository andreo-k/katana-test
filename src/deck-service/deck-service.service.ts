import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class DeckServiceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async createDeck() {}

  public foo() {
    return 2;
  }

  public async testCache() {
    await this.cacheManager.set('test_key', 'Pringles');
    const value = await this.cacheManager.get('test_key');
    return value;
  }
}
