# Consulta Fácil - Backend

Backend do projeto **Consulta Fácil**, desenvolvido para permitir o cadastro e o gerenciamento de pacientes, profissionais, clínicas, especialidades, disponibilidades e agendamentos de consultas.

A API foi desenvolvida com **Node.js**, **Express** e **PostgreSQL**, utilizando o banco de dados online **Neon**.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Neon Database
- JavaScript
- bcryptjs
- dotenv
- CORS
- Git e GitHub
- Thunder Client

## Arquitetura do projeto

O backend segue uma estrutura baseada no padrão MVC:

```text
Requisição HTTP
       |
       v
Routes
       |
       v
Controllers
       |
       v
Models
       |
       v
PostgreSQL - Neon
```

### Responsabilidades

- **Routes:** definem os endpoints da API.
- **Controllers:** recebem as requisições, validam dados e retornam respostas.
- **Models:** executam as operações no banco de dados.
- **Config:** contém a configuração de conexão com o PostgreSQL.
- **Server:** inicializa o servidor Express.

## Estrutura de pastas

```text
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── pacientesController.js
│   ├── models/
│   │   └── Pacientes.js
│   ├── routes/
│   │   └── pacientesRoutes.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Git
- Visual Studio Code ou outro editor de código

Verifique a instalação:

```bash
node -v
npm -v
git --version
```

## Como baixar o projeto

Clone o repositório:

```bash
git clone https://github.com/eritsb/Back-end-PI.git
```

Entre na pasta do projeto:

```bash
cd Back-end-PI
```

Caso o `package.json` esteja dentro da pasta `backend`, entre nela:

```bash
cd backend
```

## Instalação das dependências

Execute:

```bash
npm install
```

As dependências utilizadas pelo projeto incluem:

```text
express
cors
dotenv
bcryptjs
@neondatabase/serverless
```

## Configuração do banco de dados

Na pasta `backend`, crie um arquivo chamado:

```text
.env
```

Use o arquivo `.env.example` como modelo:

```env
DATABASE_URL=postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require
PORT=3000
```

Substitua o valor de `DATABASE_URL` pela string de conexão fornecida pelo Neon.

> O arquivo `.env` não deve ser enviado ao GitHub, pois contém informações privadas de acesso ao banco de dados.

## Executar o projeto

Para iniciar normalmente:

```bash
npm start
```

Para iniciar em modo de desenvolvimento:

```bash
npm run dev
```

Resultado esperado:

```text
Servidor rodando em http://localhost:3000
```

## Testar a API

Abra no navegador:

```text
http://localhost:3000
```

Resposta esperada:

```json
{
  "mensagem": "API Consulta Fácil funcionando"
}
```

## CRUD de pacientes

### Listar todos os pacientes

```http
GET /pacientes
```

URL local:

```text
http://localhost:3000/pacientes
```

### Buscar paciente por ID

```http
GET /pacientes/:id
```

Exemplo:

```text
http://localhost:3000/pacientes/2
```

### Cadastrar paciente

```http
POST /pacientes
```

Body JSON:

```json
{
  "nome": "Maria Silva",
  "cpf": "98765432100",
  "data_nascimento": "1995-02-10",
  "telefone": "81988888888",
  "email": "maria.silva@email.com",
  "senha": "123456",
  "endereco": "Recife - PE"
}
```

Resposta esperada:

```json
{
  "mensagem": "Paciente cadastrado com sucesso",
  "paciente": {
    "id_paciente": 2,
    "nome": "Maria Silva",
    "cpf": "98765432100",
    "data_nascimento": "1995-02-10",
    "telefone": "81988888888",
    "email": "maria.silva@email.com",
    "endereco": "Recife - PE",
    "ativo": true
  }
}
```

### Atualizar paciente

```http
PUT /pacientes/:id
```

Exemplo:

```text
http://localhost:3000/pacientes/2
```

Body JSON:

```json
{
  "telefone": "81977777777",
  "endereco": "Olinda - PE"
}
```

Podem ser enviados somente os campos que precisam ser alterados.

### Excluir paciente

```http
DELETE /pacientes/:id
```

Exemplo:

```text
http://localhost:3000/pacientes/2
```

## Status HTTP utilizados

```text
200 - Requisição concluída com sucesso
201 - Paciente cadastrado com sucesso
400 - Dados inválidos ou incompletos
404 - Paciente não encontrado
409 - CPF ou e-mail já cadastrado
500 - Erro interno do servidor
```

## Segurança das senhas

A API recebe a senha no campo:

```json
{
  "senha": "123456"
}
```

Antes de salvar no banco, a senha é criptografada com `bcryptjs`.

No PostgreSQL, o valor criptografado é armazenado na coluna:

```text
senha_hash
```

A API não retorna a senha nem o hash nas consultas de pacientes.

## Testes com Thunder Client

Instale a extensão **Thunder Client** no Visual Studio Code.

Para testar:

1. Abra o Thunder Client.
2. Clique em **New Request**.
3. Selecione o método HTTP.
4. Informe a URL.
5. Para POST ou PUT, abra **Body**.
6. Selecione **JSON**.
7. Informe os dados.
8. Clique em **Send**.

## Banco de dados

O banco PostgreSQL possui as seguintes tabelas:

```text
pacientes
clinicas
especialidades
clinica_especialidade
profissionais
disponibilidades
agendamentos
triagens
recomendacoes
notificacoes
```

## Funcionalidades implementadas

- Conexão com PostgreSQL no Neon
- Estrutura MVC
- API REST com Express
- Listagem de pacientes
- Busca de paciente por ID
- Cadastro de paciente
- Criptografia de senha
- Atualização de paciente
- Exclusão de paciente
- Validação de CPF com 11 números
- Verificação de CPF e e-mail duplicados
- Tratamento de erros HTTP

## Situação dos testes

Testado com sucesso:

- Inicialização do servidor
- Conexão com o PostgreSQL
- `GET /pacientes`
- `POST /pacientes`

Necessário validar antes da entrega:

- `GET /pacientes/:id`
- `PUT /pacientes/:id`
- `DELETE /pacientes/:id`
- Restrições de exclusão para pacientes com registros vinculados

## Deploy

O backend pode ser publicado como um Web Service no Render.

Configuração sugerida:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

No Render, também deve ser cadastrada a variável:

```env
DATABASE_URL=STRING_DE_CONEXAO_DO_NEON
```

A variável real não deve ser adicionada ao código ou ao GitHub.

## Próximas etapas

- Finalizar os testes do CRUD de pacientes
- Implementar CRUD de clínicas
- Implementar CRUD de especialidades
- Implementar CRUD de profissionais
- Implementar CRUD de disponibilidades
- Implementar CRUD de agendamentos
- Publicar a API no Render
- Integrar a API ao frontend
- Implementar autenticação dos pacientes

## Colaboração

Antes de começar a trabalhar:

```bash
git pull origin main
```

Depois de realizar alterações:

```bash
git add .
git commit -m "Descrição da alteração"
git push origin main
```

Sempre utilize `git pull` antes de iniciar uma nova alteração para reduzir o risco de conflitos.
