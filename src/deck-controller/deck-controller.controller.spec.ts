import { Test, TestingModule } from '@nestjs/testing';
import { DeckControllerController } from './deck-controller.controller';
import { CacheModule } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { DeckServiceService } from '../deck-service/deck-service.service';


describe('DeckControllerController', () => {
  let controller: DeckControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeckControllerController],
      providers: [DeckServiceService],
      imports: [
        CacheModule.register<RedisClientOptions>({
          store: redisStore,
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      ],
    }).compile();

    controller = module.get<DeckControllerController>(DeckControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
