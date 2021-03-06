import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDeckRequestDto } from '../create-deck-request-dto';
import { DeckServiceService } from '../deck-service/deck-service.service';
import { CreateDeckResponseDto } from '../create-deck-response-dto';
import { OpenDeckResponseDto } from '../open-deck-response-dto';
import { CardDto } from '../card-dto';
import * as _ from 'lodash';
import { DrawCardDto } from '../draw-card-dto';
import { DrawCardResponseDto } from '../draw-card-response-dto';

@Controller('deck')
export class DeckControllerController {
  constructor(private service: DeckServiceService) {}

  @Post()
  async create(
    @Body() dto: CreateDeckRequestDto,
  ): Promise<CreateDeckResponseDto> {
    const deck = await this.service.createDeck(dto.type, dto.shuffled);
    return {
      deckId: deck.deckId,
      remaining: deck.cards.length,
      shuffled: deck.shuffled,
      type: deck.type,
    };
  }

  @Get('/open/:uid')
  async open(@Param('uid') uid: string): Promise<OpenDeckResponseDto> {
    const deck = await this.service.openDeck(uid);
    return {
      deckId: deck.deckId,
      remaining: deck.cards.length,
      shuffled: deck.shuffled,
      type: deck.type,
      cards: _.map(deck.cards, CardDto.toDto),
    };
  }

  @Post('/draw')
  async drawCard(@Body() dto: DrawCardDto): Promise<DrawCardResponseDto> {
    const drawn = await this.service.drawCard(dto.deckId, dto.amount);
    return { cards: _.map(drawn, CardDto.toDto) };
  }
}
