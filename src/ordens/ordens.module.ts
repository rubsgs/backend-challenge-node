import { Module } from '@nestjs/common';
import { OrdensService } from './ordens.service';
import { OrdensController } from './ordens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordem } from './entities/ordem.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  controllers: [OrdensController],
  providers: [OrdensService],
  imports: [TypeOrmModule.forFeature([Cliente, Produto, Ordem])],
})
export class OrdensModule {}
