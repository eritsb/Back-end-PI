const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Pacientes =
  require("../models/Pacientes");

class AuthService {
  static criarErro(
    mensagem,
    statusCode
  ) {
    const erro = new Error(mensagem);

    erro.statusCode = statusCode;

    return erro;
  }

  static verificarConfiguracao() {
    if (!process.env.JWT_SECRET) {
      throw this.criarErro(
        "JWT_SECRET não configurada no servidor",
        500
      );
    }
  }

  static normalizarIdentificador(
    identificador
  ) {
    const valor =
      String(identificador).trim();

    if (valor.includes("@")) {
      return valor.toLowerCase();
    }

    return valor.replace(/\D/g, "");
  }

  static gerarToken(paciente) {
    this.verificarConfiguracao();

    return jwt.sign(
      {
        id: paciente.id_paciente,
        perfil: "PACIENTE"
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN ||
          "8h"
      }
    );
  }

  static async login(dados) {
    const {
      identificador,
      senha
    } = dados;

    if (!identificador || !senha) {
      throw this.criarErro(
        "E-mail ou CPF e senha são obrigatórios",
        400
      );
    }

    const identificadorNormalizado =
      this.normalizarIdentificador(
        identificador
      );

    const paciente =
      await Pacientes.buscarParaLogin(
        identificadorNormalizado
      );


    if (!paciente) {
      throw this.criarErro(
        "Credenciais inválidas",
        401
      );
    }

    if (!paciente.ativo) {
      throw this.criarErro(
        "Conta de paciente inativa",
        403
      );
    }

    const senhaCorreta =
      await bcrypt.compare(
        String(senha),
        paciente.senha_hash
      );

    if (!senhaCorreta) {
      throw this.criarErro(
        "Credenciais inválidas",
        401
      );
    }

    const token =
      this.gerarToken(paciente);

    return {
      token,

      usuario: {
        id_paciente:
          paciente.id_paciente,

        nome: paciente.nome,
        cpf: paciente.cpf,
        email: paciente.email,
        perfil: "PACIENTE"
      }
    };
  }

  static async obterPerfil(
    idPaciente
  ) {
    const paciente =
      await Pacientes.buscarPorId(
        idPaciente
      );

    if (!paciente) {
      throw this.criarErro(
        "Paciente não encontrado",
        404
      );
    }

    return {
      ...paciente,
      perfil: "PACIENTE"
    };
  }
}

module.exports = AuthService;