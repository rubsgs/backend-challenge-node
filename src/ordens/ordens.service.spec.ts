import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdensService } from './ordens.service';

describe('OrdensService', () => {
  let service: OrdensService;

  beforeEach(async () => {
    const ordemMock = [];
    const repositoryMock = {
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdensService,
        { provide: 'OrdemRepository', useValue: repositoryMock },
        { provide: 'ClienteRepository', useValue: repositoryMock },
        { provide: 'ProdutoRepository', useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<OrdensService>(OrdensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
