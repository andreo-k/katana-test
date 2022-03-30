import { IsNotEmpty, IsPositive } from 'class-validator';

export class DrawCardDto {
  @IsNotEmpty()
  deckId: string;

  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
