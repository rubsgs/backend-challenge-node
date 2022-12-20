import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Repository } from 'typeorm';
import { CreateOrdemDto } from './dto/create-ordem.dto';
import { Ordem } from './entities/ordem.entity';

@Injectable()
export class OrdensService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(Ordem) private ordemRepository: Repository<Ordem>,
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
  ) {}

  async create(createOrdemDto: CreateOrdemDto) {
    try {
      this.logger.log(
        `Criando compra para o cliente ${createOrdemDto.idCliente}, produto ${createOrdemDto.idProduto}`,
      );
      const ordem = new Ordem();
      Object.assign(ordem, createOrdemDto);
      const cliente = await this.clienteRepository.findOneBy({
        idCliente: createOrdemDto.idCliente,
      });
      const produto = await this.produtoRepository.findOneBy({
        idProduto: createOrdemDto.idProduto,
      });

      ordem.cliente = cliente;
      ordem.produto = produto;
      this.ordemRepository.save(ordem);
    } catch (e) {
      this.logger.error(`Ocorreu um erro ao tentar salvar a compra`);
      this.logger.error(e.message);
      this.logger.error(e.stack);
      throw e;
    }
  }

  findAll() {
    return this.ordemRepository.find();
  }

  findOne(idTransacao: number) {
    return this.ordemRepository.findOneBy({ idTransacao });
  }
}
