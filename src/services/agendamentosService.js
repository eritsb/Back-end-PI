const Agendamentos =
  require("../models/Agendamentos");

class AgendamentosService {
  static criarErro(
    mensagem,
    statusCode
  ) {
    const erro = new Error(mensagem);

    erro.statusCode = statusCode;

    return erro;
  }

  static validarId(id, nomeCampo) {
    const idNumerico = Number(id);

    if (
      !Number.isInteger(idNumerico) ||
      idNumerico <= 0
    ) {
      throw this.criarErro(
        `${nomeCampo} inválido`,
        400
      );
    }

    return idNumerico;
  }

  static validarStatus(status) {
    const statusPermitidos = [
      "AGENDADO",
      "CONFIRMADO",
      "CANCELADO",
      "REALIZADO"
    ];

    const statusNormalizado =
      String(status).trim().toUpperCase();

    if (
      !statusPermitidos.includes(
        statusNormalizado
      )
    ) {
      throw this.criarErro(
        "Status inválido. Utilize AGENDADO, CONFIRMADO, CANCELADO ou REALIZADO",
        400
      );
    }

    return statusNormalizado;
  }

  static async listarTodos() {
    return await Agendamentos
      .listarTodos();
  }

  static async buscarPorId(id) {
    const idAgendamento =
      this.validarId(
        id,
        "ID do agendamento"
      );

    const agendamento =
      await Agendamentos.buscarPorId(
        idAgendamento
      );

    if (!agendamento) {
      throw this.criarErro(
        "Agendamento não encontrado",
        404
      );
    }

    return agendamento;
  }

  static async listarPorPaciente(
    idPaciente
  ) {
    const pacienteId =
      this.validarId(
        idPaciente,
        "ID do paciente"
      );

    const paciente =
      await Agendamentos
        .buscarPaciente(pacienteId);

    if (!paciente) {
      throw this.criarErro(
        "Paciente não encontrado",
        404
      );
    }

    return await Agendamentos
      .listarPorPaciente(pacienteId);
  }

  static async cadastrar(dados) {
    const {
      id_paciente,
      id_profissional,
      id_disponibilidade,
      observacao
    } = dados;

    if (
      !id_paciente ||
      !id_profissional ||
      !id_disponibilidade
    ) {
      throw this.criarErro(
        "Paciente, profissional e disponibilidade são obrigatórios",
        400
      );
    }

    const pacienteId =
      this.validarId(
        id_paciente,
        "ID do paciente"
      );

    const profissionalId =
      this.validarId(
        id_profissional,
        "ID do profissional"
      );

    const disponibilidadeId =
      this.validarId(
        id_disponibilidade,
        "ID da disponibilidade"
      );

    const paciente =
      await Agendamentos
        .buscarPaciente(pacienteId);

    if (!paciente) {
      throw this.criarErro(
        "Paciente não encontrado",
        404
      );
    }

    if (!paciente.ativo) {
      throw this.criarErro(
        "O paciente está inativo",
        409
      );
    }

    const disponibilidade =
      await Agendamentos
        .buscarDisponibilidade(
          disponibilidadeId
        );

    if (!disponibilidade) {
      throw this.criarErro(
        "Disponibilidade não encontrada",
        404
      );
    }

    if (
      Number(
        disponibilidade.id_profissional
      ) !== profissionalId
    ) {
      throw this.criarErro(
        "A disponibilidade não pertence ao profissional informado",
        400
      );
    }

    if (
      !disponibilidade
        .profissional_ativo
    ) {
      throw this.criarErro(
        "O profissional está inativo",
        409
      );
    }

    if (
      disponibilidade.status !==
      "DISPONIVEL"
    ) {
      throw this.criarErro(
        "O horário selecionado não está disponível",
        409
      );
    }

    const conflito =
      await Agendamentos
        .buscarConflitoPaciente(
          pacienteId,
          disponibilidade.data,
          disponibilidade.hora_inicio
        );

    if (conflito) {
      throw this.criarErro(
        "O paciente já possui um agendamento nesse horário",
        409
      );
    }

    const agendamento =
      await Agendamentos.cadastrar({
        id_paciente: pacienteId,

        id_profissional:
          profissionalId,

        id_disponibilidade:
          disponibilidadeId,

        observacao:
          observacao !== undefined &&
          observacao !== ""
            ? String(observacao).trim()
            : null
      });

    if (!agendamento) {
      throw this.criarErro(
        "O horário acabou de ser reservado por outra pessoa",
        409
      );
    }

    return await Agendamentos
      .buscarPorId(
        agendamento.id_agendamento
      );
  }

  static async atualizar(id, dados) {
    const idAgendamento =
      this.validarId(
        id,
        "ID do agendamento"
      );

    const agendamentoAtual =
      await Agendamentos
        .buscarAgendamentoCompleto(
          idAgendamento
        );

    if (!agendamentoAtual) {
      throw this.criarErro(
        "Agendamento não encontrado",
        404
      );
    }

    const {
      observacao,
      status
    } = dados;

    /*
      Para mudar profissional, data ou
      horário, utilize futuramente uma
      operação específica de reagendamento.
    */

    let novoStatus =
      agendamentoAtual.status;

    if (status !== undefined) {
      novoStatus =
        this.validarStatus(status);
    }

    if (
      novoStatus === "CANCELADO"
    ) {
      return await this.cancelar(
        idAgendamento
      );
    }

    if (
      agendamentoAtual.status ===
      "CANCELADO"
    ) {
      throw this.criarErro(
        "Um agendamento cancelado não pode ser alterado",
        409
      );
    }

    const agendamento =
      await Agendamentos.atualizarDados(
        idAgendamento,
        {
          observacao:
            observacao !== undefined
              ? observacao === null ||
                String(
                  observacao
                ).trim() === ""
                ? null
                : String(
                    observacao
                  ).trim()
              : agendamentoAtual
                  .observacao,

          status: novoStatus
        }
      );

    return await Agendamentos
      .buscarPorId(
        agendamento.id_agendamento
      );
  }

  static async cancelar(id) {
    const idAgendamento =
      this.validarId(
        id,
        "ID do agendamento"
      );

    const agendamentoAtual =
      await Agendamentos
        .buscarAgendamentoCompleto(
          idAgendamento
        );

    if (!agendamentoAtual) {
      throw this.criarErro(
        "Agendamento não encontrado",
        404
      );
    }

    if (
      agendamentoAtual.status ===
      "CANCELADO"
    ) {
      throw this.criarErro(
        "O agendamento já está cancelado",
        409
      );
    }

    if (
      agendamentoAtual.status ===
      "REALIZADO"
    ) {
      throw this.criarErro(
        "Um agendamento realizado não pode ser cancelado",
        409
      );
    }

    const agendamento =
      await Agendamentos.cancelar(
        idAgendamento
      );

    if (!agendamento) {
      throw this.criarErro(
        "Não foi possível cancelar o agendamento",
        409
      );
    }

    return await Agendamentos
      .buscarPorId(idAgendamento);
  }

  static async excluir(id) {
    const idAgendamento =
      this.validarId(
        id,
        "ID do agendamento"
      );

    const agendamentoAtual =
      await Agendamentos
        .buscarAgendamentoCompleto(
          idAgendamento
        );

    if (!agendamentoAtual) {
      throw this.criarErro(
        "Agendamento não encontrado",
        404
      );
    }

    const agendamento =
      await Agendamentos.excluir(
        idAgendamento
      );

    return agendamento;
  }
}

module.exports = AgendamentosService;