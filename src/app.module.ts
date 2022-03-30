import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeckServiceService } from './deck-service/deck-service.service';
import { CacheModule } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { DeckControllerController } from './deck-controller/deck-controller.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController, DeckControllerController],
  providers: [AppService, DeckServiceService],
})
export class AppModule {}
