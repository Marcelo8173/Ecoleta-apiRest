# Ecoleta-apiRest

![Ecoleta](https://github.com/Marcelo8173/Ecoleta-mobile/blob/master/src/assets/logo.png)

App de coleta de resíduos - API

- A api do Ecoleta é uma API Rest construida com nodeJS e TypeScript.

#### Requisitos

- NodeJS v5.2.0+

#### Como executar

- Faça o clone/download deste repositório, execute `npm install` ou `yarn` para instala as dependências.
- `Npm run dev` ou `yarn dev` para executar a api.
- A API fica localizada em `http://localhost:3000`.
- Execute o comando `knex:migrate` para criar o banco de dados (sqlite3).
- Execute o comando `knex:seed` para popular a base de dados.

#### Rotas

- `GET /items` para listar todos items que podem ser coletados.
- `GET /points/1` para listar um ponto de coleta específico.
- `GET /points` para listar todos os pontos de coleta.
- `POST /points` para cadastrar um novo ponto de coleta.

#### Front-end

- versão web `https://github.com/Marcelo8173/Ecoleta-Front-end`.
- versão mobile `https://github.com/Marcelo8173/Ecoleta-mobile`.

 ![Ecoleta](https://github.com/Marcelo8173/Ecoleta-mobile/blob/master/src/assets/home-background.svg)
#### Notas

- Esse aplicativo foi construído como projeto da semana next level week da rocketseat.
- Ele se encontra na versão 1.0. 
