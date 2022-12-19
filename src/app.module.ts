import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { OrdensModule } from './ordens/ordens.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClienteController } from './cliente/cliente.controller';
import { ProdutosController } from './produtos/produtos.controller';
import { OrdensController } from './ordens/ordens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { ConfigModule } from '@nestjs/config';
import { ClienteService } from './cliente/cliente.service';
import { OrdensService } from './ordens/ordens.service';
import { ProdutosService } from './produtos/produtos.service';
import { Produto } from './produtos/entities/produto.entity';
import { Ordem } from './ordens/entities/ordem.entity';

@Module({
  imports: [
    ClienteModule,
    ProdutosModule,
    OrdensModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      entities: [Cliente, Produto, Ordem],
    }),
    TypeOrmModule.forFeature([Cliente, Produto, Ordem]),
  ],
  controllers: [ClienteController, ProdutosController, OrdensController],
  providers: [ClienteService, OrdensService, ProdutosService],
})
export class AppModule {}
