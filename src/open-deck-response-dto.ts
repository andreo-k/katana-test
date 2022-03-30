import { DeckType } from './deck';
import { Card } from './card';
import { CardDto } from './card-dto';

export class OpenDeckResponseDto {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
  cards: CardDto[];
}
