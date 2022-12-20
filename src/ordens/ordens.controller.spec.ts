import { Test, TestingModule } from '@nestjs/testing';
import { OrdensController } from './ordens.controller';
import { OrdensService } from './ordens.service';

describe('OrdensController', () => {
  let controller: OrdensController;

  beforeEach(async () => {
    const ordemMock = [];
    const repositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdensController],
      providers: [
        OrdensService,
        { provide: 'OrdemRepository', useValue: repositoryMock },
        { provide: 'ClienteRepository', useValue: repositoryMock },
        { provide: 'ProdutoRepository', useValue: repositoryMock },
      ],
    }).compile();

    controller = module.get<OrdensController>(OrdensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
