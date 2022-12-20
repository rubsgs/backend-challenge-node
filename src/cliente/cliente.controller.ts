import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @ApiOkResponse({ description: 'Retorna o cliente criado' })
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @ApiOkResponse({ description: 'Retorna um array de cliente' })
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }
  @ApiOkResponse({ description: 'Retorna um único cliente' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }
}
