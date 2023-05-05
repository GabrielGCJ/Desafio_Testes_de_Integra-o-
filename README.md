# Desafio Testes de Integração: Chapter IV
Este é o segundo desafio do chapter IV da Rocket Ignite, um programa de capacitação intensiva em desenvolvimento de software.

![image](https://user-images.githubusercontent.com/91347602/232902040-1eb12147-f163-4dd8-bf03-0d2cd96cefb7.png)

### Objetivos :

#### Nesse desafio, o objetivo é criar testes unitários para uma aplicação usando os conceitos ensinados nas aulas.

### A aplicação deve ter as seguintes capacidades :

- Instalação fácil e sem complicações.

- Testes unitarios que possam ser executados para garantir a funcionalidade adequada da aplicação.

- Possibilidade de criar uma imagem do banco de dados para facilitar a replicação e a migração para diferentes ambientes.

- Migrations que possam ser executados para garantir que o esquema do banco de dados esteja atualizado.

- Ser gerenciada facilmente por meio de uma aplicação de gerenciamento de banco de dados, como o Beekeeper.

---

#### Observação: 
##### Esta API foi desenvolvida para ser utilizada dentro de um container Docker. Para testar suas funções corretamente dentro de um container, é necessário instalar o aplicativo e configurá-lo adequadamente para utilização dentro de um container. Caso não tenha ele instalado em sua maquina:

![image](https://user-images.githubusercontent.com/91347602/236373804-f4ab7ad5-e103-4109-9bbe-611d37949dbf.png)


https://www.docker.com/

---

### Para executar o projeto:

Clone este repositório em sua máquina:

`git clone https://github.com/GabrielGCJ/rocketseat-chapter-IV-desafioTestesDeIntegracao.git`

Entre na pasta do projeto:

`cd rocketseat-chapter-IV-desafioTestesDeIntegracao`

Instale o projeto:

`yarn install`

Iniciar testes:

`yarn test`

Crie uma imagem e faça o upload para o Docker utilizando os parâmetros especificados no arquivo docker-compose.yml:

`docker-compose up -d`

Execute as migrações no banco de dados:

`yarn typeorm migration:run`

---

## Rotas da aplicação:
###### Cada endpont é representado deve enviar um conjunto de parametros para funcionar corretamente. Para te ajudar a entender melhor o funcionamento da aplicação como um todo, abaixo você verá uma descrição de cada rota e quais parâmetros recebe.

### POST `/api/v1/users`

A rota recebe `name`, `email` e `password` dentro do corpo da requisição, salva o usuário criado no banco e retorna uma resposta vazia com status `201`. 

------

### POST `/api/v1/sessions`

A rota recebe `email` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT. 

<aside>
💡 Essa aplicação não possui refresh token, ou seja, o token criado dura apenas 1 dia e deve ser recriado após o período mencionado.
</aside>

------

### GET `/api/v1/profile`

A rota recebe um token JWT pelo header da requisição e retorna as informações do usuário autenticado.

------

### GET `/api/v1/statements/balance`

A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito e saque do usuário autenticado e também o saldo total numa propriedade `balance`.

------

### POST `/api/v1/statements/deposit`

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de depósito do valor e retorna as informações do depósito criado com status `201`.

------

### POST `/api/v1/statements/withdraw`

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de saque do valor (caso o usuário possua saldo válido) e retorna as informações do saque criado com status `201`. 

------

### GET `/api/v1/statements/:statement_id`

A rota recebe um token JWT pelo header e o id de uma operação registrada (saque ou depósito) na URL da rota e retorna as informações da operação encontrada.

------
------
------

### Para testar as funcionalidades da API e realizar requisições com sucesso, é recomendável o uso de uma aplicação de Cliente de API, como o Postman ou Insomnia.

![image](https://user-images.githubusercontent.com/91347602/232907354-81bfa735-8b77-45b0-a624-9964122a11bc.png)

### https://www.postman.com/downloads/

### https://insomnia.rest/download

### Para melhorar a visualização e o gerenciamento do banco de dados, é recomendado o uso do Beekeeper como aplicativo de gerenciamento de banco de dados.

![image](https://user-images.githubusercontent.com/91347602/236375566-de63d8af-1a10-4b52-aeba-30ea183f6e3e.png)

### https://www.beekeeperstudio.io/get
-------------------
# Desafio_Testes_de_Integracao

1- yarn

2- docker build -t nome_do_projeto .

3- docker-compose up

4- yarn typeorm migration:run

5- yarn test
