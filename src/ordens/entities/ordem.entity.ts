import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('Ordens')
export class Ordem {
  @PrimaryColumn()
  idTransacao: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto;

  @Column()
  valorCompra: number;

  @Column()
  qtdCompra: number;

  @Column()
  totalCompra: number;

  @Column()
  dataOrdem: Date;

  @BeforeInsert()
  private calculaTotal() {
    this.totalCompra = this.qtdCompra * this.valorCompra;
  }
}
