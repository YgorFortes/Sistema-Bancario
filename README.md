## A API permite:

-   Criar conta bancária
-   Atualizar os dados do usuário da conta bancária
-   Depositar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário
-   Excluir uma conta bancária



## Persistências dos dados

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. Todas as transações e contas bancárias são inseridas dentro deste objeto.

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
    banco: {
        nome: "Cubos Bank",
        numero: "123",
        agencia: "0001",
        senha: "123Bank",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}



```

## Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=123`

Esse endpoint lista todas as contas bancárias existentes.


### Criar conta bancária

#### `POST` `/contas`

Esse endpoint  cria uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).


-   Entradas

    -   Nome
    -   Cpf
    -   Data Nascimento
    -   Telefone
    -   Email
    -   Senha

-   Saída

    -   Dados usuário
    -   Número da conta
    -   Saldo



### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint  atualiza apenas os dados do usuário de uma conta bancária.


-   Entradas

    -   Nome
    -   Cpf
    -   Data Nascimento
    -   Telefone
    -   Email
    -   Senha

-   Saída

    -   Sucesso ou erro



### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint exclui uma conta bancária existente.



-   Entradas

    -   Numero da conta bancária (passado como parâmetro na rota)

-   Saida

    -   Sucesso ou erro


### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint  soma o valor do depósito ao saldo de uma conta válida e registrar essa transação.


-   Entrada

    -   Número da conta
    -   Valor

-   Saida

    -   Sucesso ou erro




#### Exemplo do registro de um depósito

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint  realiza o saque de um valor em uma determinada conta bancária e registrar essa transação.


-   Entrada

    -   Número da conta
    -   Valor
    -   Senha

-   Saída

    -   Sucesso ou erro



#### Exemplo do registro de um saque

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint  permiti a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.


-   Entrada

    -   Número da conta (origem)
    -   Senha da conta (origem)
    -   Valor
    -   Número da conta (destino)

-   Saída

    -   Sucesso ou erro



#### Saída


#### Exemplo do registro de uma transferência

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta_origem: "1",
    numero_conta_destino: "2",
    valor: 10000
}
```

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint  retorna o saldo de uma conta bancária.


-   Entrada (query params)

    -   Número da conta
    -   Senha

-   Saída

    -   Saldo da conta



### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint  lista as transações realizadas de uma conta específica.


-   Entrada (query params)

    -   Número da conta
    -   Senha

-   Saída
    -   Relatório da conta



#### Saída

```javascript
// HTTP Status 200
{
  depositos: [
    {
      data: "2021-08-18 20:46:03",
      numero_conta: "1",
      valor: 10000
    },
    {
      data: "2021-08-18 20:46:06",
      numero_conta: "1",
      valor: 10000
    }
  ],
  saques: [
    {
      data: "2021-08-18 20:46:18",
      numero_conta: "1",
      valor: 1000
    }
  ],
  transferenciasEnviadas: [
    {
      data: "2021-08-18 20:47:10",
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 5000
    }
  ],
  transferenciasRecebidas: [
    {
      data: "2021-08-18 20:47:24",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    },
    {
      data: "2021-08-18 20:47:26",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    }
  ]
}


