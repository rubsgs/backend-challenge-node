import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    try {
      this.logger.log(`Criando produto ${createProdutoDto.nome}`);
      return this.produtoRepository.save(createProdutoDto);
    } catch (e) {
      this.logger.error(
        `Ocorreu um erro ao tentar salvar o produto ${createProdutoDto.nome}`,
      );
      this.logger.error(e.message);
      this.logger.error(e.stack);
      throw e;
    }
  }

  findAll() {
    return this.produtoRepository.find();
  }

  findOne(idProduto: number) {
    return this.produtoRepository.findBy({ idProduto });
  }
}
