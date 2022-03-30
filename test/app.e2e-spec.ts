import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CardSuite } from '../src/card';
import { DeckType } from '../src/deck';

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

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
  //
  // it('/deck (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/deck')
  //     .send({ type: DeckType.FULL, shuffled: true })
  //     .expect(201)
  //     .expect({ status: 0, substatus: { value: 3 } });
  // });

  it('create deck and open it', async() => {
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

    console.log('done');
  });

});
