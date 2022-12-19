import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrdemDto {
  @IsNotEmpty()
  @IsNumber()
  idCliente: number;

  @IsNotEmpty()
  @IsNumber()
  idProduto: number;

  @IsNotEmpty()
  @IsNumber()
  valorCompra: number;

  @IsNotEmpty()
  @IsNumber()
  qtdCompra: number;

  @IsNotEmpty()
  @IsDateString()
  dataOrdem: Date;
}
