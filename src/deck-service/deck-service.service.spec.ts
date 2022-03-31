import { Test, TestingModule } from '@nestjs/testing';
import { DeckServiceService } from './deck-service.service';
import { CacheModule, HttpException } from '@nestjs/common';
import { Deck, DeckType } from '../deck';
import { Card } from '../card';

describe('DeckServiceService', () => {
  let service: DeckServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [DeckServiceService],
    }).compile();

    service = module.get<DeckServiceService>(DeckServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('open non-existing deck', async () => {
    await expect(service.openDeck('non-existing')).rejects.toThrow(
      HttpException,
    );
  });

  it('create deck, open it and draw few cards', async () => {
    const deck: Deck = await service.createDeck(DeckType.SHORT, false);

    let openedDeck: Deck = await service.openDeck(deck.deckId);
    expect(openedDeck.deckId).toBe(deck.deckId);
    expect(openedDeck.shuffled).toBeFalsy();
    expect(openedDeck.cards.length).toBe(deck.cards.length);

    for (let i = 0; i < deck.cards.length; ++i) {
      expect(openedDeck.cards[i].suit).toBe(deck.cards[i].suit);
      expect(openedDeck.cards[i].rank).toBe(deck.cards[i].rank);
    }

    // check drawn cards
    const drawn: Card[] = await service.drawCard(deck.deckId, 10);
    for (let i = 0; i < 10; ++i) {
      expect(drawn[i].suit).toBe(deck.cards[i].suit);
      expect(drawn[i].suit).toBe(deck.cards[i].suit);
    }

    // check remaining cards
    openedDeck = await service.openDeck(deck.deckId);
    expect(openedDeck.cards.length).toBe(26);
    for (let i = 0; i < 26; ++i) {
      expect(openedDeck.cards[i].suit).toBe(deck.cards[i + 10].suit);
      expect(openedDeck.cards[i].rank).toBe(deck.cards[i + 10].rank);
    }
  });

  it('create deck and draw all cards', async () => {
    const deck: Deck = await service.createDeck(DeckType.SHORT, false);

    // check drawn cards
    const drawn: Card[] = await service.drawCard(deck.deckId, 36);
    for (let i = 0; i < 36; ++i) {
      expect(drawn[i].suit).toBe(deck.cards[i].suit);
      expect(drawn[i].suit).toBe(deck.cards[i].suit);
    }

    // check that no cards are remaining
    const openedDeck = await service.openDeck(deck.deckId);
    expect(openedDeck.cards.length).toBe(0);
  });

  it('create deck and draw more cards than exist', async () => {
    const deck: Deck = await service.createDeck(DeckType.SHORT, false);

    await expect(service.drawCard(deck.deckId, 37)).rejects.toThrow(
      HttpException,
    );
  });
});
