# Consulta Fácil - Backend

## Sobre o Projeto

O Consulta Fácil é uma plataforma para gerenciamento e agendamento de consultas médicas, desenvolvida como Projeto Integrador.

O sistema permite:

- Cadastro de pacientes
- Cadastro de especialidades
- Cadastro de clínicas
- Cadastro de profissionais
- Cadastro de disponibilidades
- Agendamento de consultas
- Login e autenticação de pacientes
- Comunicação Client-Server através de API REST
- Persistência de dados em PostgreSQL

---

# Tecnologias Utilizadas

## Backend

- Node.js
- Express
- PostgreSQL
- Neon Database
- JWT
- bcryptjs
- dotenv
- CORS

## Infraestrutura

- GitHub
- Render
- Neon

---

# Arquitetura

O projeto utiliza arquitetura em camadas:

```text
Routes
 ↓
Controllers
 ↓
Services
 ↓
Models
 ↓
Database
```

## Estrutura de Pastas

```text
src
│
├── config
│   └── database.js
│
├── controllers
│   ├── pacientesController.js
│   ├── especialidadesController.js
│   ├── clinicasController.js
│   ├── profissionaisController.js
│   ├── disponibilidadesController.js
│   ├── agendamentosController.js
│   └── authController.js
│
├── services
│   ├── pacientesService.js
│   ├── especialidadesService.js
│   ├── clinicasService.js
│   ├── profissionaisService.js
│   ├── disponibilidadesService.js
│   ├── agendamentosService.js
│   └── authService.js
│
├── models
│   ├── Pacientes.js
│   ├── Especialidades.js
│   ├── Clinicas.js
│   ├── Profissionais.js
│   ├── Disponibilidades.js
│   └── Agendamentos.js
│
├── routes
│   ├── pacientesRoutes.js
│   ├── especialidadesRoutes.js
│   ├── clinicasRoutes.js
│   ├── profissionaisRoutes.js
│   ├── disponibilidadesRoutes.js
│   ├── agendamentosRoutes.js
│   └── authRoutes.js
│
└── server.js
```

---

# Banco de Dados

Tabelas implementadas:

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

---

# Deploy

## Backend

```text
https://back-end-pi-ihs1.onrender.com
```

## Banco

```text
Neon PostgreSQL
```

---

# Autenticação

## Login

```http
POST /auth/login
```

Exemplo:

```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

### Segurança

- JWT
- bcryptjs
- Senhas criptografadas
- Tokens Bearer

---

# Módulos Implementados

## Pacientes

```http
GET    /pacientes
GET    /pacientes/:id
POST   /pacientes
PUT    /pacientes/:id
DELETE /pacientes/:id
```

### Recursos

- Cadastro
- Listagem
- Atualização
- Exclusão
- Validação de CPF
- Validação de e-mail
- Senha criptografada

---

## Especialidades

```http
GET    /especialidades
GET    /especialidades/:id
POST   /especialidades
PUT    /especialidades/:id
DELETE /especialidades/:id
```

### Recursos

- Cadastro
- Listagem
- Atualização
- Exclusão
- Nome único

---

## Clínicas

```http
GET    /clinicas
GET    /clinicas/:id
POST   /clinicas
PUT    /clinicas/:id
DELETE /clinicas/:id
```

### Recursos

- Cadastro
- Listagem
- Atualização
- Exclusão
- CNPJ único

---

## Profissionais

```http
GET    /profissionais
GET    /profissionais/:id
POST   /profissionais
PUT    /profissionais/:id
DELETE /profissionais/:id
```

### Recursos

- Cadastro
- Listagem
- Atualização
- Exclusão
- CPF único
- Registro profissional único

---

## Disponibilidades

```http
GET    /disponibilidades
GET    /disponibilidades/:id
POST   /disponibilidades
PUT    /disponibilidades/:id
DELETE /disponibilidades/:id
```

### Recursos

- Cadastro de horários
- Controle de status
- Consulta de disponibilidade

---

## Agendamentos

```http
GET    /agendamentos
GET    /agendamentos/:id

GET    /agendamentos/paciente/:idPaciente

POST   /agendamentos

PUT    /agendamentos/:id

PATCH  /agendamentos/:id/cancelar

DELETE /agendamentos/:id
```

### Recursos

- Agendamento de consultas
- Consulta por paciente
- Consulta por ID
- Atualização
- Cancelamento
- Exclusão
- Controle automático de disponibilidade

---

# Como Executar

## Instalar dependências

```bash
npm install
```

## Arquivo .env

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=8h
PORT=3000
```

## Iniciar servidor

```bash
npm start
```

ou

```bash
npm run dev
```

---

# Status da Primeira Entrega

## Implementado

✅ Banco PostgreSQL

✅ API REST

✅ Login

✅ JWT

✅ Pacientes

✅ Especialidades

✅ Clínicas

✅ Profissionais

✅ Disponibilidades

✅ Agendamentos

✅ MVC

✅ Services

✅ Deploy Backend

✅ Deploy Banco

✅ Integração Backend + Banco

---

# Próximas Melhorias

- Consulta de profissionais por clínica
- Consulta de profissionais por especialidade
- Consulta de horários por profissional
- Associação Clínica x Especialidade
- Testes automatizados
- Swagger
- Pré-triagem
- Inteligência Artificial

---

# Integrantes

Projeto desenvolvido para a disciplina de Projeto Integrador.

Alunoa envolvidos: Ericha Taina, Felipe Michell, Flávio Gonçalves, kennedy Veras e Rejane Mendonça

Instituição: SENAC

Professor: Geraldo Gomes