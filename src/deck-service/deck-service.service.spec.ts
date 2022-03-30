import { Test, TestingModule } from '@nestjs/testing';
import { DeckServiceService } from './deck-service.service';
import { CacheModule } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

describe('DeckServiceService', () => {
  let service: DeckServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register<RedisClientOptions>({
          store: redisStore,
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      ],
      providers: [DeckServiceService],
    }).compile();

    service = module.get<DeckServiceService>(DeckServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('foo should return 2', () => {
    expect(service.foo()).toBe(2);
  });

  it('testCache should return Pringles', async () => {
    expect(await service.testCache()).toBe('Pringles');
  });
});
