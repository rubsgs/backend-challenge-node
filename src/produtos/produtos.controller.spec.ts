import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Produto } from './entities/produto.entity';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

describe('ProdutosController', () => {
  let controller: ProdutosController;
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
      return produtoMock[filter.idProduto - 1];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        ProdutosService,
        { provide: 'ProdutoRepository', useValue: repositoryMock },
      ],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call save() and return the created product with id', async () => {
    const produto = { nome: faker.lorem.words(), ativo: true };
    jest.spyOn(repositoryMock, 'save');

    const saved = await controller.create(produto);
    expect(repositoryMock.save).toBeCalled();
    expect(saved.idProduto).toBeTruthy();
  });

  it('should return an array of products', async () => {
    const produtos = await controller.findAll();
    expect(produtos.length).toBe(produtoMock.length);
    produtos.forEach((prod, index) => {
      expect(prod.idProduto).toBe(produtoMock[index].idProduto);
    });
  });

  it('should return a single product', async () => {
    const id = faker.datatype.number({
      min: 1,
      max: produtoMock.length,
      precision: 1,
    });

    const produto = await controller.findOne(id.toString());
    expect(produto.idProduto).toBe(produtoMock[id - 1].idProduto);
  });
});
