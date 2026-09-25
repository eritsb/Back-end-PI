const Disponibilidades =
 require("../models/Disponibilidades");

class DisponibilidadesService {

  static async listarTodos() {

    return await Disponibilidades
      .listarTodos();

  }

  static async buscarPorId(id) {

    const disponibilidade =
      await Disponibilidades
        .buscarPorId(id);

    if (!disponibilidade) {

      throw new Error(
        "Disponibilidade não encontrada"
      );

    }

    return disponibilidade;

  }

  static async cadastrar(dados) {

    const {
      id_profissional,
      data,
      hora_inicio,
      hora_fim
    } = dados;

    if (
      !id_profissional ||
      !data ||
      !hora_inicio ||
      !hora_fim
    ) {

      throw new Error(
        "Todos os campos são obrigatórios"
      );

    }

    const existe =
      await Disponibilidades
        .buscarDuplicada(
          id_profissional,
          data,
          hora_inicio,
          hora_fim
        );

    if (existe) {

      throw new Error(
        "Disponibilidade já cadastrada"
      );

    }

    return await Disponibilidades
      .cadastrar({
        ...dados,
        status: "DISPONIVEL"
      });

  }

  static async atualizar(id,dados){

    const disponibilidade =
      await Disponibilidades
        .buscarPorId(id);

    if (!disponibilidade){

      throw new Error(
        "Disponibilidade não encontrada"
      );

    }

    return await Disponibilidades
      .atualizar(
        id,
        {
          ...disponibilidade,
          ...dados
        }
      );

  }

  static async excluir(id){

    const disponibilidade =
      await Disponibilidades
        .excluir(id);

    if (!disponibilidade){

      throw new Error(
        "Disponibilidade não encontrada"
      );

    }

    return disponibilidade;

  }

}

module.exports =
 DisponibilidadesService;