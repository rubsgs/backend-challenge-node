import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsBoolean, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ example: 'string YYYY-MM-DD' })
  @IsNotEmpty()
  @IsDateString()
  dtNascimento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
