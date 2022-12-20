import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

describe('ClienteController', () => {
  let controller: ClienteController;
  const clienteMock: Cliente[] = new Array(3).fill(null).map(() => {
    return {
      idCliente: faker.datatype.number({ precision: 1 }),
      nome: faker.lorem.words(),
      cpf: faker.random.numeric(11),
      dtNascimento: faker.date.past(),
      ativo: true,
    };
  });
  const repositoryMock = {
    save: jest.fn().mockImplementation((cliente: CreateClienteDto) => {
      return {
        idCliente: faker.datatype.number({ precision: 1 }),
        ...cliente,
      };
    }),
    find: jest.fn().mockImplementation(() => clienteMock),
    findOneBy: jest.fn().mockImplementation((filter) => {
      return clienteMock[filter.idCliente - 1];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        ClienteService,
        { provide: 'ClienteRepository', useValue: repositoryMock },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call save() and return the created product with id', async () => {
    const cliente = {
      nome: faker.lorem.words(),
      cpf: faker.random.numeric(11),
      dtNascimento: faker.date.past().toISOString(),
      ativo: true,
    };
    jest.spyOn(repositoryMock, 'save');

    const saved = await controller.create(cliente);
    expect(repositoryMock.save).toBeCalled();
    expect(saved.idCliente).toBeTruthy();
  });

  it('should return an array of products', async () => {
    const Clientes = await controller.findAll();
    expect(Clientes.length).toBe(clienteMock.length);
    Clientes.forEach((prod, index) => {
      expect(prod.idCliente).toBe(clienteMock[index].idCliente);
    });
  });

  it('should return a single product', async () => {
    const id = faker.datatype.number({
      min: 0,
      max: clienteMock.length,
      precision: 1,
    });

    const Cliente = await controller.findOne(id.toString());
    expect(Cliente.idCliente).toBe(clienteMock[id - 1].idCliente);
  });
});
