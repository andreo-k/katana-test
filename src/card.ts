import { IsEmail, IsNotEmpty, IsEnum, Matches } from 'class-validator';

export enum CardSuite {
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
  HEARTS = 'HEARTS',
}

export enum CardRank {
  _2 = 2,
  _3 = 3,
  _4 = 4,
  _5 = 5,
  _6 = 6,
  _7 = 7,
  _8 = 8,
  _9 = 9,
  _10 = 10,
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

export var ALL_CARD_RANKS = [CardRank._2, CardRank._3, CardRank._4, CardRank._5, CardRank._6,
  CardRank._7, CardRank._8, CardRank._9, CardRank._10,
  CardRank.JACK, CardRank.QUEEN, CardRank.KING, CardRank.ACE];

export class Card {
  @IsNotEmpty()
  @IsEnum(CardSuite)
  public suit: CardSuite;

  @IsNotEmpty()
  @IsEnum(CardRank)
  public rank: CardRank;

  public constructor() {
  }
}
