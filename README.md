# Projeto SP2: BackEnd

##

Para iniciar o projeto é necessário instalar todas as dependências e DevDependencias, para isso basta dar um npm install.

Após instalar as dependências é necessário alterar o nome do arquivo .env.exemple para somente .env e popular ele com as config do usupario que vai rodar a app, assim também como a SECRET_KEY.

## Introdução

Está é uma aplicação básica que visa um CRUD completo de um client, este poderá adicionar vários contatos, assim como visualiza-los, edita-los e excluí-los.

**A entrega deve seguir as seguintes regras:**

- Você deverá criar um cadastro de clientes que poderá conter muitos contatos associados. Depois deste processo deverá ter um relatório em tela, ou PDF que mostre dados do cliente e os contatos vinculados a este cliente.

- Obs: nesse desafio utilize Javascript e/ou Typescript

## Endpoints:

| Método | Endpoint      | Responsabilidade             | Autenticação                          |
| ------ | ------------- | ---------------------------- | ------------------------------------- |
| POST   | /client       | Criação de usuário           | Qualquer usuário, não necessita token |
| GET    | /client       | Lista todos os usuários      | Usuários autenticados                 |
| PATCH  | /client       | Atualiza o usuário           | Apenas Dono da conta                  |
| DELETE | /client       | Deleta o usuário             | Apenas Dono da conta                  |
| POST   | /login        | Gera o token de autenticação | Qualquer usuário, não necessita token |
| POST   | /contacts     | Criação de contatos          | Apenas Dono da conta                  |
| GET    | /contacts     | Lista todos os contacts      | Apenas Dono da conta                  |
| PATCH  | /contacts/:id | Atualiza um contato          | Apenas Dono da conta                  |
| DELETE | /contacts/:id | Deleta um contato            | Apenas Dono da conta                  |

## Requisitos do Serviço

### POST - /client

- Rota para criação de usuário com os seguintes dados:
  - **id**: Valor SERIAL. Não deve ser passado, mas gerado pelo typeORM;
  - **name**: string, máximo de 45 caracteres e obrigatório;
  - **email**: string, máximo de 45 caracteres, obrigatório e único;
  - **password**: Deverá receber uma string, mas armazenar uma hash gerada com o **bcryptjs** diretamente pela **entidade do typeORM** e máximo de 120 caracteres;
  - **telephone**: string, único e obrigatório;
  - **createdAt**: Não deve ser passado, mas gerado pelo typeORM;
- A rota de criação deve retornar todos os dados, com **exceção da hash** de senha;
- Não podem ser cadastrados dois usuários com o mesmo **e-mail** e/ou **telephone**;
- A rota **não precisa de autenticação** para ser acessada.

### GET - /client

- A rota deve retornar todos os dados dos clients, com exceção da hash de senha;
- A rota pode ser acessada apenas por usuários autenticados.

### PATCH - /client

- Rota deve atualizar os dados do usuário;
- Não deve ser possível atualizar os campos **id**;
- Apenas podem atualizar seu próprio usuário.

### DELETE - /client

- Rota deve deletar o próprio usuário

### POST - /login

- Rota de login recebendo **email** e **password**;
- O login deve validar se o usuário existe e validar se a senha está correta;
- A rota **não precisa de autenticação** para ser acessada.

### POST - /contact

- Rota para criação de contatos com os seguintes dados:
- **id**: Valor SERIAL. Não deve ser passado, mas gerado pelo typeORM;
- **name**: string, máximo de 45 caracteres e obrigatório;
- **email**: string, máximo de 45 caracteres, obrigatório e único;
- **second_email**: string, máximo de 45 caracteres, único e opicional;
- **telephone**: string, único e obrigatório;
- **second_telephone**: string, único e opcional;
- **createdAt**: Não deve ser passado, mas gerado pelo typeORM;
- A rota de criação deve retornar todos os dados.
- Não podem ser cadastrados dois usuários com o mesmo **e-mail**, **second_email**, **telephone** e/ou **second_telephone**;

### GET - /contacts

- Rota deve listar todos os contacts.
- A rota precisa de autenticação para ser acessada

### PATCH - /contacts/:id

- Rota deve atualizar os dados do contato do usuário logado
- Não deve ser possível atualizar os campos **id**;
- Apenas podem atualizar seu próprio contato.

### DELETE - /contacts/:id

- Rota deve deletar o contato do usuário logado
