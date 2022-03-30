import { DeckType } from './deck';

export class CreateDeckResponseDto {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
}
