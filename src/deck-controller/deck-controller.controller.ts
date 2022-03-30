import { Body, Controller, Post } from '@nestjs/common';
import { Card } from '../card';

@Controller('deck')
export class DeckControllerController {

  @Post()
  create(@Body() card: Card): any {
    console.log('!!! card is ', JSON.stringify(card));
    return {status: 0, substatus: {value: 3}};
  }
}
