const sql = require("../config/database");

class PacientesController {

  // GET /pacientes
  async listar(req, res) {
    try {
      const pacientes = await sql`
        SELECT *
        FROM pacientes
        ORDER BY id_paciente
      `;

      res.status(200).json(pacientes);
    } catch (error) {
      console.error("ERRO LISTAR:", error);
      res.status(500).json({ erro: error.message });
    }
  }

  // GET /pacientes/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const pacientes = await sql`
        SELECT *
        FROM pacientes
        WHERE id_paciente = ${id}
      `;

      if (pacientes.length === 0) {
        return res.status(404).json({ erro: "Paciente nao encontrado" });
      }

      res.status(200).json(pacientes[0]);
    } catch (error) {
      console.error("ERRO BUSCAR:", error);
      res.status(500).json({ erro: error.message });
    }
  }

  // POST /pacientes
  async cadastrar(req, res) {
    try {
      const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha_hash,
        endereco
      } = req.body;

      if (!nome || !cpf || !data_nascimento || !email || !senha_hash) {
        return res.status(400).json({
          erro: "Campos obrigatorios: nome, cpf, data_nascimento, email, senha_hash"
        });
      }

      const pacientes = await sql`
        INSERT INTO pacientes (
          nome,
          cpf,
          data_nascimento,
          telefone,
          email,
          senha_hash,
          endereco
        )
        VALUES (
          ${nome},
          ${cpf},
          ${data_nascimento},
          ${telefone || null},
          ${email},
          ${senha_hash},
          ${endereco || null}
        )
        RETURNING *
      `;

      res.status(201).json(pacientes[0]);
    } catch (error) {
      console.error("ERRO CADASTRAR:", error);

      if (error.code === "23505") {
        return res.status(409).json({ erro: "CPF ou e-mail ja cadastrado" });
      }

      res.status(500).json({ erro: error.message });
    }
  }

  // PUT /pacientes/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        endereco,
        ativo
      } = req.body;

      const pacientes = await sql`
        UPDATE pacientes
        SET
          nome            = COALESCE(${nome || null}, nome),
          cpf             = COALESCE(${cpf || null}, cpf),
          data_nascimento = COALESCE(${data_nascimento || null}, data_nascimento),
          telefone        = COALESCE(${telefone || null}, telefone),
          email           = COALESCE(${email || null}, email),
          endereco        = COALESCE(${endereco || null}, endereco),
          ativo           = COALESCE(${ativo === undefined ? null : ativo}, ativo)
        WHERE id_paciente = ${id}
        RETURNING *
      `;

      if (pacientes.length === 0) {
        return res.status(404).json({ erro: "Paciente nao encontrado" });
      }

      res.status(200).json(pacientes[0]);
    } catch (error) {
      console.error("ERRO ATUALIZAR:", error);

      if (error.code === "23505") {
        return res.status(409).json({ erro: "CPF ou e-mail ja cadastrado" });
      }

      res.status(500).json({ erro: error.message });
    }
  }

  // DELETE /pacientes/:id
  async excluir(req, res) {
    try {
      const { id } = req.params;

      const pacientes = await sql`
        DELETE FROM pacientes
        WHERE id_paciente = ${id}
        RETURNING id_paciente, nome
      `;

      if (pacientes.length === 0) {
        return res.status(404).json({ erro: "Paciente nao encontrado" });
      }

      res.status(200).json({
        mensagem: "Paciente removido com sucesso",
        paciente: pacientes[0]
      });
    } catch (error) {
      console.error("ERRO EXCLUIR:", error);

      if (error.code === "23503") {
        return res.status(409).json({
          erro: "Nao e possivel excluir: paciente possui agendamentos ou triagens"
        });
      }

      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = new PacientesController();
