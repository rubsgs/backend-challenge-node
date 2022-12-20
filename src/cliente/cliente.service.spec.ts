import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
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
        return clienteMock[filter.idCliente];
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: 'ClienteRepository', useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
