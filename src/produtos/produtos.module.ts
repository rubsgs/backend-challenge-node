import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService],
  imports: [TypeOrmModule.forFeature([Produto])],
})
export class ProdutosModule {}
