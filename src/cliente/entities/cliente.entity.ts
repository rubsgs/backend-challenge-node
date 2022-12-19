import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Cliente')
export class Cliente {
  @PrimaryColumn()
  idCliente: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  dtNascimento: Date;

  @Column()
  ativo: boolean;
}
