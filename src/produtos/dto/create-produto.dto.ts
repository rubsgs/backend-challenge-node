import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
