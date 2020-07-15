# iHeros - Teste Fullstack ZRP

Desafio ZRP para desenvolvedores Fullstack: https://zrpaplicacoes.github.io/challenges/dev/

## A Solução

- Frontend: Webapp feito com React
- Backend: API feita com NestJS com banco de dados PostgreSQL

## Executando o projeto - Com Docker

Com o docker instalado e atualizado, execute o comando

```
> docker-compose up
```

## Executando o projeto - Sem Docker

Tenha a última versão do NodeJS instalado e um servidor PostgreSQL local ou remoto disponível.

### Backed

Navegue até a pasta do projeto e instale as dependências:

```
> cd backend
> npm install
```

Cofigure as variáveis de ambiente no arquivo .env (se necessário):

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/iheros
DATABASE_SSL=false
...
PORT=3001
HOST=localhost
...
```

Crie um banco de dados e execute as migrations:

```
> npm run db:create
> npm run migration
```

Inicie o projeto:

```
> npm run start:faster
```

### Frontend

Navegue até a pasta do projeto e  instale as dependências:

```
> cd frontend
> npm install
```

Cofigure as variáveis de ambiente no arquivo .env (se necessário):

```
REACT_APP_API_URL=http://localhost:3001
```

Inicie o projeto:

```
> npm start
```

## Observações

O backend recebe dados através de um WebSocket da ZRP. Para que não haja sobrecarga do banco de dados, a comunicação com o WS é estabelecida assim que um login é feito, e interrompida 30 minutos depois.
