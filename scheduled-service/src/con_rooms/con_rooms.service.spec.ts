import { Test, TestingModule } from '@nestjs/testing';
import { ConRoomsService } from './con_rooms.service';

describe('ConRoomsService', () => {
  let service: ConRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConRoomsService],
    }).compile();

    service = module.get<ConRoomsService>(ConRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
