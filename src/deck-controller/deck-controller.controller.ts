import { Body, Controller, Post } from '@nestjs/common';
import { Card } from '../card';
import { CreateDeckRequestDto } from '../create-deck-request-dto';
import { Deck } from '../deck';

@Controller('deck')
export class DeckControllerController {
  @Post()
  create(@Body() dto: CreateDeckRequestDto): any {
    return Deck.generate(dto.type, dto.shuffled);
  }
}
