import { DeckType } from './deck';
import { CardDto } from './card-dto';

export class OpenDeckResponseDto {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
  cards: CardDto[];
}
