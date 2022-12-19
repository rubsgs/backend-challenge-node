import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Produtos')
export class Produto {
  @PrimaryColumn()
  idProduto: number;

  @Column()
  nome: string;

  @Column()
  ativo: boolean;
}
