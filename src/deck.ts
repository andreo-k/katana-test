import { ALL_CARD_RANKS, Card, CardRank, CardSuite } from './card';
import * as _ from 'lodash';


export enum DeckType {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

export class Deck {
  cards: Card[] = [];
  shuffled: boolean;
  type: DeckType;

  public static generate(type: DeckType, shuffled: boolean) {
    let res = new Deck();
    res.type = type;
    res.shuffled = shuffled;

    // @ts-ignore
    for (let rank of ALL_CARD_RANKS) {
      if (rank < CardRank._6 && type != DeckType.FULL) {
        continue;
      }
      // @ts-ignore
      for (let suit in CardSuite) {
        res.cards.push({rank: rank, suit: suit as CardSuite});
      }
    }

    if (shuffled) {
      res.cards = _.shuffle(res.cards);
    }

    return res;
  }
}
