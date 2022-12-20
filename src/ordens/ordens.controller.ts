import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdensService } from './ordens.service';
import { CreateOrdemDto } from './dto/create-ordem.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('ordens')
export class OrdensController {
  constructor(private readonly ordensService: OrdensService) {}

  @ApiOkResponse({ description: 'Retorna a transação criada' })
  @Post()
  create(@Body() createOrdemDto: CreateOrdemDto) {
    return this.ordensService.create(createOrdemDto);
  }

  @ApiOkResponse({ description: 'Retorna um array de transações' })
  @Get()
  findAll() {
    return this.ordensService.findAll();
  }

  @ApiOkResponse({ description: 'Retorna uma única transação' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordensService.findOne(+id);
  }
}
