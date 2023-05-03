# Desafio Testes de Integração: Chapter IV
Este é o primeiro chapter no desafio 01 da Rocket Ignite, um programa de capacitação intensiva em desenvolvimento de software.

![image](https://user-images.githubusercontent.com/91347602/232902040-1eb12147-f163-4dd8-bf03-0d2cd96cefb7.png)

### Objetivos:

#### Nesse desafio, o objetivo foi criar uma aplicação para treinamento de conceitos de Node.js! A aplicação tem por finalidade gerenciar tarefas (em inglês *todos*)

### Deve ser possivel:

- Criação de um usuário com `name` e `username`.
- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header)

---

### Para rodar o projeto:

Clone este repositório em sua máquina:

`git clone https://github.com/GabrielGCJ/desafio-1-rocketseat.git`

Entre na pasta do projeto:

`cd desafio-1-rocketseat`

Instale o projeto:

`yarn install`

Rode o projeto:

`yarn dev`

Acesse o endereço localhost porta 3333 em seu navegador ou ferramenta de testes para interagir com a API:

http://localhost:3333

---

### Para testar as utilidades da API é importante o uso de uma aplicação de API Client como Postman ou Insomnia.

![image](https://user-images.githubusercontent.com/91347602/232907354-81bfa735-8b77-45b0-a624-9964122a11bc.png)

### https://www.postman.com/downloads/

### https://insomnia.rest/download

---
A API implementada durante este chapter possui os seguintes endpoints:

![image](https://user-images.githubusercontent.com/91347602/233130037-144c6352-b522-4e07-8566-c2f9f7c8e6ba.png)

Cada endpont é representado deve enviar um conjunto de parametros para funcionar corretamente.

---

######  1 - POST - Cadastro de usuario:
http://localhost:3333/users

######  2 - GET - Todas as tarefas:
http://localhost:3333/todos

######  3 - POST - Adicionar tarefa:
http://localhost:3333/todos

######  4 - PUT - Editar tarefa:
http://localhost:3333/todos/ (ID DA TAREFA)

######  5 - PATCH - Alterar tarefa como feita:
http://localhost:3333/todos/ (ID DA TAREFA)

######  6 - DELETE - Deletar tafera:
http://localhost:3333/todos/ (ID DA TAREFA)




# Desafio_Testes_de_Integracao

1- yarn

2- docker build -t nome_do_projeto .

3- docker-compose up

4- yarn typeorm migration:run

5- yarn test
