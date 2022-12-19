import { IsNotEmpty, IsDateString, IsBoolean, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  dtNascimento: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
