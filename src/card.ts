import { IsEmail, IsNotEmpty, IsEnum, Matches } from 'class-validator';

export enum CardSuite {
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
  HEARTS = 'HEARTS'
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
  ACE = 'ACE'
}


export class Card {
  @IsNotEmpty()
  @IsEnum(CardSuite)
  public suite: CardSuite;

  @IsNotEmpty()
  @IsEnum(CardRank)
  public rank: CardRank;

  public constructor() {}

  // public constructor(suite: CardSuite, rank: CardRank) {
  //   this.suite = suite;
  //   this.rank = rank;
  // }
}
