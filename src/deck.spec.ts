import { Deck, DeckType } from './deck';
import { CardRank } from './card';
import * as _ from 'lodash';

describe('Deck', () => {
  it('should be defined', () => {
    expect(new Deck()).toBeDefined();
  });

  it('generate short and not-shuffled deck', () => {
    let deck = Deck.generate(DeckType.SHORT, false);
    expect(deck.shuffled).toBe(false);
    expect(deck.type).toBe(DeckType.SHORT);
    expect(deck.cards.length).toBe(36);
    expect(deck.cards[0].rank).toBe(CardRank._6);
    expect(deck.cards[35].rank).toBe(CardRank.ACE);
  });

  it('generate short and shuffled deck', () => {
    let deck = Deck.generate(DeckType.SHORT, true);
    expect(deck.shuffled).toBe(true);
    expect(deck.type).toBe(DeckType.SHORT);
    expect(deck.cards.length).toBe(36);

    // make sure that four aces are somewhere there
    expect(_.filter(deck.cards, c => c.rank === CardRank.ACE).length).toBe(4);
  });

  it('generate full and not-shuffled deck', () => {
    let deck = Deck.generate(DeckType.FULL, false);
    expect(deck.shuffled).toBe(false);
    expect(deck.type).toBe(DeckType.FULL);
    expect(deck.cards.length).toBe(52);
    expect(deck.cards[0].rank).toBe(CardRank._2);
    expect(deck.cards[51].rank).toBe(CardRank.ACE);
  });

  it('generate full and shuffled deck', () => {
    let deck = Deck.generate(DeckType.FULL, true);
    expect(deck.shuffled).toBe(true);
    expect(deck.type).toBe(DeckType.FULL);
    expect(deck.cards.length).toBe(52);

    // make sure that four aces are somewhere there
    expect(_.filter(deck.cards, c => c.rank === CardRank.ACE).length).toBe(4);
  });

});
