export enum CardSuite {
  SPADES,
  CLUBS,
  DIAMONDS,
  HEARTS
}

export enum CardHigherRank {
  JACK,
  QUEEN,
  KING,
  ACE
}

type CardRank = number | CardHigherRank;

export class Card {
  public suite: CardSuite;
  public rank: CardRank;

  public constructor(suite: CardSuite, rank: CardRank) {
    this.suite = suite;
    this.rank = rank;
  }
}
