import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrdemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idCliente: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  idProduto: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  valorCompra: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  qtdCompra: number;

  @ApiProperty({ example: 'string YYYY-MM-DD' })
  @IsNotEmpty()
  @IsDateString()
  dataOrdem: Date;
}
