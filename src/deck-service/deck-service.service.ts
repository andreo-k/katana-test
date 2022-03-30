import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Deck, DeckType } from '../deck';

@Injectable()
export class DeckServiceService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async createDeck(type: DeckType, shuffled: boolean): Promise<Deck> {
    let deck = Deck.generate(type, shuffled);
    await this.cacheManager.set(deck.deckId, deck);
    // let res = await this.cacheManager.get(deck.deckId);
    return deck;
  }


  public async openDeck(uid: string): Promise<Deck> {
    let res = await this.cacheManager.get(uid);
    if (!res) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return res as Deck;
  }

  public async testCache() {
    await this.cacheManager.set('test_key', 'Pringles');
    const value = await this.cacheManager.get('test_key');
    return value;
  }
}
