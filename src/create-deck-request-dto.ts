import { DeckType } from './deck';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateDeckRequestDto {
  @IsNotEmpty()
  @IsEnum(DeckType)
  type: DeckType;

  @IsNotEmpty()
  @IsBoolean()
  shuffled: boolean;
}
