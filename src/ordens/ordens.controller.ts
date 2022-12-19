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

@Controller('ordens')
export class OrdensController {
  constructor(private readonly ordensService: OrdensService) {}

  @Post()
  create(@Body() createOrdemDto: CreateOrdemDto) {
    return this.ordensService.create(createOrdemDto);
  }

  @Get()
  findAll() {
    return this.ordensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordensService.findOne(+id);
  }
}
