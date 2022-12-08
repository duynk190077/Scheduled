import { Test, TestingModule } from '@nestjs/testing';
import { ConRoomsController } from './con_rooms.controller';
import { ConRoomsService } from './con_rooms.service';

describe('ConRoomsController', () => {
  let controller: ConRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConRoomsController],
      providers: [ConRoomsService],
    }).compile();

    controller = module.get<ConRoomsController>(ConRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
