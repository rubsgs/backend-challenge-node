import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
  ) {}
  create(createClienteDto: CreateClienteDto) {
    try {
      this.logger.log(`Criando cliente ${createClienteDto.nome}`);
      return this.clienteRepository.save(createClienteDto);
    } catch (e) {
      this.logger.error(
        `Ocorreu um erro ao tentar salvar o cliente ${createClienteDto.nome}`,
      );
      this.logger.error(e.message);
      this.logger.error(e.stack);
      throw e;
    }
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(idCliente: number) {
    return this.clienteRepository.findOneBy({ idCliente });
  }
}
