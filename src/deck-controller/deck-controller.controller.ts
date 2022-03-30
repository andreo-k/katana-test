import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Card } from '../card';
import { CreateDeckRequestDto } from '../create-deck-request-dto';
import { Deck } from '../deck';
import { Cache } from 'cache-manager';
import { DeckServiceService } from '../deck-service/deck-service.service';
import { CreateDeckResponseDto } from '../create-deck-response-dto';
import { OpenDeckResponseDto } from '../open-deck-response-dto';
import { CardDto } from '../card-dto';
import * as _ from 'lodash';

@Controller('deck')
export class DeckControllerController {
  constructor(private service: DeckServiceService) {
  }

  @Post()
  async create(@Body() dto: CreateDeckRequestDto): Promise<CreateDeckResponseDto> {
    let deck = await this.service.createDeck(dto.type, dto.shuffled);
    return { deckId: deck.deckId, remaining: deck.cards.length, shuffled: deck.shuffled, type: deck.type };
  }

  @Get('/open/:uid')
  async open(@Param('uid') uid: string): Promise<OpenDeckResponseDto> {
    let deck = await this.service.openDeck(uid);
    return {
      deckId: deck.deckId,
      remaining: deck.cards.length,
      shuffled: deck.shuffled,
      type: deck.type,
      cards: _.map(deck.cards, CardDto.toDto),
    };
  }
}
