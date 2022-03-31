import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Deck, DeckType } from '../deck';
import { Card } from '../card';
import * as _ from 'lodash';

@Injectable()
export class DeckServiceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async createDeck(type: DeckType, shuffled: boolean): Promise<Deck> {
    const deck = Deck.generate(type, shuffled);
    await this.cacheManager.set(deck.deckId, deck);
    return deck;
  }

  public async openDeck(uid: string): Promise<Deck> {
    const res = await this.cacheManager.get(uid);
    if (!res) {
      throw new HttpException(
        'Can not find deck by uid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return res as Deck;
  }

  public async drawCard(deckId: string, amount: number): Promise<Card[]> {
    const deck = (await this.cacheManager.get(deckId)) as Deck;
    if (!deck) {
      throw new HttpException(
        'Can not find deck by uid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (amount > deck.cards.length) {
      throw new HttpException(
        'Amount passed exceeds number of remaining cards',
        HttpStatus.BAD_REQUEST,
      );
    }

    const drawn = _.take(deck.cards, amount);

    deck.cards = _.slice(deck.cards, amount);

    await this.cacheManager.set(deck.deckId, deck); // save modified deck

    return drawn;
  }
}
