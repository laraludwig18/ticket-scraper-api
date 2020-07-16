# TicketScraper

Backend da aplicação que realiza consulta na api do ticket para obter informações do usuário e do extrato do cartão.

![CI](https://github.com/laraludwig18/ticket-scraper-api/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/laraludwig18/ticket-scraper-api/badge.svg?branch=master)](https://coveralls.io/github/laraludwig18/ticket-scraper-api?branch=master)

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
