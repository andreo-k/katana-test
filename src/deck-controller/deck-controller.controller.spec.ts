import { Test, TestingModule } from '@nestjs/testing';
import { DeckControllerController } from './deck-controller.controller';

describe('DeckControllerController', () => {
  let controller: DeckControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeckControllerController],
    }).compile();

    controller = module.get<DeckControllerController>(DeckControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
