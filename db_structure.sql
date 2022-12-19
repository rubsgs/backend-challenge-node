create table "Cliente"(
  "idCliente" serial primary key,
  "nome" varchar(255),
  "cpf" varchar(255),
  "dtNascimento" date,
  "ativo" boolean
);

create table "Produtos"(
  "idProduto" serial primary key,
  "nome" varchar(255),
  "ativo" boolean
);

create table "Ordens"(
  "idTransacao" serial primary key,
  "idCliente" integer not null,
  "idProduto" integer not null,
  "valorCompra" numeric(10,4),
  "qtdCompra" numeric(10,4),
  "totalCompra" numeric(10,4),
  "dataOrdem" date,
  constraint fk_ordem__cliente foreign key("idCliente") references "Cliente"("idCliente"), 
  constraint fk_ordem__produtos foreign key("idCliente") references "Produtos"("idProduto")
);