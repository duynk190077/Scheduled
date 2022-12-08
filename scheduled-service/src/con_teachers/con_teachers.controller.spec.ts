import { Test, TestingModule } from '@nestjs/testing';
import { ConTeachersController } from './con_teachers.controller';
import { ConTeachersService } from './con_teachers.service';

describe('ConTeachersController', () => {
  let controller: ConTeachersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConTeachersController],
      providers: [ConTeachersService],
    }).compile();

    controller = module.get<ConTeachersController>(ConTeachersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
