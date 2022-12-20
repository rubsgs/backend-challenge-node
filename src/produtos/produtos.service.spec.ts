import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosService } from './produtos.service';
import { faker } from '@faker-js/faker';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

describe('ProdutosService', () => {
  let service: ProdutosService;
  const produtoMock: Produto[] = new Array(3).fill(null).map(() => {
    return {
      idProduto: faker.datatype.number({ precision: 1 }),
      nome: faker.lorem.words(),
      ativo: true,
    };
  });
  const repositoryMock = {
    save: jest.fn().mockImplementation((product: CreateProdutoDto) => {
      return { idProduto: faker.datatype.number({ precision: 1 }), ...product };
    }),
    find: jest.fn().mockImplementation(() => produtoMock),
    findOneBy: jest.fn().mockImplementation((filter) => {
      return produtoMock[filter.idProduto];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        { provide: 'ProdutoRepository', useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
