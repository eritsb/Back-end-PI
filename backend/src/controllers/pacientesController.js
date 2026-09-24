const bcrypt = require("bcryptjs");
const Pacientes = require("../models/Pacientes");

class PacientesController {
  static async listar(req, res) {
    try {
      const pacientes = await Pacientes.listarTodos();

      return res.status(200).json(pacientes);
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);

      return res.status(500).json({
        erro: "Erro interno ao listar pacientes"
      });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
          erro: "ID do paciente inválido"
        });
      }

      const paciente = await Pacientes.buscarPorId(id);

      if (!paciente) {
        return res.status(404).json({
          erro: "Paciente não encontrado"
        });
      }

      return res.status(200).json(paciente);
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);

      return res.status(500).json({
        erro: "Erro interno ao buscar paciente"
      });
    }
  }

  static async cadastrar(req, res) {
    try {
      const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        endereco
      } = req.body;

      if (!nome || !cpf || !data_nascimento || !email || !senha) {
        return res.status(400).json({
          erro:
            "Nome, CPF, data de nascimento, e-mail e senha são obrigatórios"
        });
      }

      const cpfLimpo = String(cpf).replace(/\D/g, "");

      const emailNormalizado = String(email)
        .trim()
        .toLowerCase();

      if (cpfLimpo.length !== 11) {
        return res.status(400).json({
          erro: "O CPF deve conter 11 números"
        });
      }

      if (String(senha).length < 6) {
        return res.status(400).json({
          erro: "A senha deve possuir pelo menos 6 caracteres"
        });
      }

      const pacienteExistente =
        await Pacientes.buscarPorCpfOuEmail(
          cpfLimpo,
          emailNormalizado
        );

      if (pacienteExistente) {
        return res.status(409).json({
          erro: "CPF ou e-mail já cadastrado"
        });
      }

      const senhaHash = await bcrypt.hash(
        String(senha),
        10
      );

      const paciente = await Pacientes.cadastrar({
        nome: String(nome).trim(),
        cpf: cpfLimpo,
        data_nascimento,
        telefone: telefone || null,
        email: emailNormalizado,
        senha_hash: senhaHash,
        endereco: endereco || null
      });

      return res.status(201).json({
        mensagem: "Paciente cadastrado com sucesso",
        paciente
      });
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);

      if (error.code === "23505") {
        return res.status(409).json({
          erro: "CPF ou e-mail já cadastrado"
        });
      }

      return res.status(500).json({
        erro: "Erro interno ao cadastrar paciente"
      });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
          erro: "ID do paciente inválido"
        });
      }

      const pacienteAtual =
        await Pacientes.buscarCompletoPorId(id);

      if (!pacienteAtual) {
        return res.status(404).json({
          erro: "Paciente não encontrado"
        });
      }

      const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        endereco,
        ativo
      } = req.body;

      const novoCpf = cpf
        ? String(cpf).replace(/\D/g, "")
        : pacienteAtual.cpf;

      const novoEmail = email
        ? String(email).trim().toLowerCase()
        : pacienteAtual.email;

      if (novoCpf.length !== 11) {
        return res.status(400).json({
          erro: "O CPF deve conter 11 números"
        });
      }

      const duplicado =
        await Pacientes.buscarDuplicado(
          novoCpf,
          novoEmail,
          id
        );

      if (duplicado) {
        return res.status(409).json({
          erro: "CPF ou e-mail utilizado por outro paciente"
        });
      }

      let senhaHash = pacienteAtual.senha_hash;

      if (senha) {
        if (String(senha).length < 6) {
          return res.status(400).json({
            erro: "A senha deve possuir pelo menos 6 caracteres"
          });
        }

        senhaHash = await bcrypt.hash(
          String(senha),
          10
        );
      }

      const paciente = await Pacientes.atualizar(id, {
        nome: nome
          ? String(nome).trim()
          : pacienteAtual.nome,

        cpf: novoCpf,

        data_nascimento:
          data_nascimento ||
          pacienteAtual.data_nascimento,

        telefone:
          telefone !== undefined
            ? telefone
            : pacienteAtual.telefone,

        email: novoEmail,

        senha_hash: senhaHash,

        endereco:
          endereco !== undefined
            ? endereco
            : pacienteAtual.endereco,

        ativo:
          ativo !== undefined
            ? ativo
            : pacienteAtual.ativo
      });

      return res.status(200).json({
        mensagem: "Paciente atualizado com sucesso",
        paciente
      });
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);

      if (error.code === "23505") {
        return res.status(409).json({
          erro: "CPF ou e-mail já cadastrado"
        });
      }

      return res.status(500).json({
        erro: "Erro interno ao atualizar paciente"
      });
    }
  }

  static async excluir(req, res) {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
          erro: "ID do paciente inválido"
        });
      }

      const paciente = await Pacientes.excluir(id);

      if (!paciente) {
        return res.status(404).json({
          erro: "Paciente não encontrado"
        });
      }

      return res.status(200).json({
        mensagem: "Paciente excluído com sucesso",
        paciente
      });
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);

      if (error.code === "23503") {
        return res.status(409).json({
          erro:
            "O paciente possui registros vinculados e não pode ser excluído"
        });
      }

      return res.status(500).json({
        erro: "Erro interno ao excluir paciente"
      });
    }
  }
}

module.exports = PacientesController;