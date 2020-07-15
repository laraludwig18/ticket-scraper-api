# TicketScraper

Backend da aplicação que realiza consulta na api do ticket para obter informações do usuário e do extrato do cartão

![CI](https://github.com/laraludwig18/ticket-scraper-api/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/laraludwig18/gobarber-api/badge.svg?branch=ci-test)](https://coveralls.io/github/laraludwig18/gobarber-api?branch=ci-test)

## Inicialização

Criar banco mongo:
```
docker run --name ticket-scraper -p 27017:27017 -d -t mongo
```
Instalar dependências:
```
yarn
```
Rodar projeto:
```
yarn dev
```

## TODO:

- [x] Salvar dados de autenticação no MongoDB
- [x] Validar dados da request com celebrate
- [x] Generate JWT with user id information
- [x] Add middleware to validate JWT content
- [x] Testes unitários
- [x] Adicionar collection no insomnia
- [ ] Melhorar README
- [x] CI usando github actions
- [ ] Deploy heroku
- [ ] Documentação com swagger
