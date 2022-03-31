import { Card } from './card';

export class CardDto {
  value: string;
  suit: string;
  code: string;

  public static toDto(card: Card): CardDto {
    return {
      value: card.rank as string,
      suit: card.suit as string,
      code: String(card.rank)[0] + String(card.suit)[0],
    };
  }
}
