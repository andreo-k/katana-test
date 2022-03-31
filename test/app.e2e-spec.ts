import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CardRank, CardSuite } from '../src/card';
import { DeckType } from '../src/deck';
import * as _ from 'lodash';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('create full unshuffled deck and open it', async() => {
    let res1:any = await request(app.getHttpServer())
      .post('/deck')
      .send({ type: DeckType.FULL, shuffled: false })
      .expect(201);

    let res2 = await request(app.getHttpServer())
      .get(`/deck/open/${res1.body.deckId}`)
      .expect(200);

    expect(res1.body.deckId).toBe(res2.body.deckId);
    expect(res2.body.remaining).toBe(52);
    expect(res2.body.cards[0].code).toBe('2S');
    expect(res2.body.cards[51].code).toBe('AH');
  });

  it('create short shuffled deck and draw some cards', async() => {
    let res1 : any = await request(app.getHttpServer())
      .post('/deck')
      .send({ type: DeckType.SHORT, shuffled: true })
      .expect(201);

    let res2 : any = await request(app.getHttpServer())
      .get(`/deck/open/${res1.body.deckId}`)
      .expect(200);

    expect(res1.body.deckId).toBe(res2.body.deckId);
    expect(res2.body.remaining).toBe(36);

    // make sure that there are four aces somewhere
    expect(_.filter(res2.body.cards, c => c.value === CardRank.ACE).length).toBe(4);

    // try to draw two cards
    let res3 : any = await request(app.getHttpServer())
      .post('/deck/draw')
      .send({ deckId: res1.body.deckId, amount: 2 })
      .expect(201);

    expect(res3.body.cards.length).toBe(2);
    expect(res3.body.cards[0].code).toBe(res2.body.cards[0].code);
    expect(res3.body.cards[1].code).toBe(res2.body.cards[1].code);

    // try to draw 36 cards - should be error, since there are 34 remaining now
    await request(app.getHttpServer())
      .post('/deck/draw')
      .send({ deckId: res1.body.deckId, amount: 36 })
      .expect(400);

    // check content of deck again
    let res4 : any = await request(app.getHttpServer())
      .get(`/deck/open/${res1.body.deckId}`)
      .expect(200);
    expect(res4.body.deckId).toBe(res1.body.deckId);
    expect(res4.body.remaining).toBe(34);
    // check two cards on top
    expect(res4.body.cards[0].code).toBe(res2.body.cards[2].code);
    expect(res4.body.cards[1].code).toBe(res2.body.cards[3].code);
  });

});
