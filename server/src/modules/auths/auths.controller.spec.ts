import { Test, TestingModule } from '@nestjs/testing';
import { AuthsController } from './auths.controller';

describe('AuthsController', () => {
  let controller: AuthsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthsController],
    }).compile();

    controller = module.get<AuthsController>(AuthsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
