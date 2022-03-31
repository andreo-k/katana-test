import { ALL_CARD_RANKS, Card, CardRank, CardSuite } from './card';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export enum DeckType {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

export class Deck {
  deckId: string;
  cards: Card[] = [];
  shuffled: boolean;
  type: DeckType;

  public static generate(type: DeckType, shuffled: boolean) {
    const res = new Deck();
    res.deckId = uuidv4();
    res.type = type;
    res.shuffled = shuffled;

    for (const rank of ALL_CARD_RANKS) {
      if (rank < CardRank._6 && type != DeckType.FULL) {
        continue;
      }
      for (const suit in CardSuite) {
        res.cards.push({ rank: rank, suit: suit as CardSuite });
      }
    }

    if (shuffled) {
      res.cards = _.shuffle(res.cards);
    }

    return res;
  }
}
