import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @ApiOkResponse({ description: 'Retorna o produto criado' })
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @ApiOkResponse({ description: 'Retorna um array de produtos' })
  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @ApiOkResponse({ description: 'Retorna um único produto' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }
}
