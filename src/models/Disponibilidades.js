const sql = require("../config/database");

class Disponibilidades {

  static async listarTodos() {

    return await sql`

      SELECT
        d.*,
        p.nome AS profissional_nome

      FROM disponibilidades d

      INNER JOIN profissionais p
      ON d.id_profissional =
         p.id_profissional

      ORDER BY data, hora_inicio

    `;

  }

  static async buscarPorId(id) {

    const resultado = await sql`

      SELECT *
      FROM disponibilidades

      WHERE id_disponibilidade =
            ${id}

    `;

    return resultado[0];

  }

  static async listarPorProfissional(
    idProfissional
  ) {

    return await sql`

      SELECT *
      FROM disponibilidades

      WHERE id_profissional =
            ${idProfissional}

      ORDER BY data,
               hora_inicio

    `;

  }

  static async buscarDuplicada(
    id_profissional,
    data,
    hora_inicio,
    hora_fim
  ) {

    const resultado = await sql`

      SELECT *

      FROM disponibilidades

      WHERE
        id_profissional =
        ${id_profissional}

      AND data = ${data}

      AND hora_inicio =
          ${hora_inicio}

      AND hora_fim =
          ${hora_fim}

      LIMIT 1

    `;

    return resultado[0];

  }

  static async cadastrar(dados) {

    const resultado = await sql`

      INSERT INTO disponibilidades
      (
        id_profissional,
        data,
        hora_inicio,
        hora_fim,
        status
      )

      VALUES
      (
        ${dados.id_profissional},
        ${dados.data},
        ${dados.hora_inicio},
        ${dados.hora_fim},
        ${dados.status}
      )

      RETURNING *

    `;

    return resultado[0];

  }

  static async atualizar(id,dados) {

    const resultado = await sql`

      UPDATE disponibilidades

      SET
        id_profissional =
          ${dados.id_profissional},

        data =
          ${dados.data},

        hora_inicio =
          ${dados.hora_inicio},

        hora_fim =
          ${dados.hora_fim},

        status =
          ${dados.status}

      WHERE id_disponibilidade =
            ${id}

      RETURNING *

    `;

    return resultado[0];

  }

  static async excluir(id) {

    const resultado = await sql`

      DELETE FROM disponibilidades

      WHERE id_disponibilidade =
            ${id}

      RETURNING *

    `;

    return resultado[0];

  }

}

module.exports = Disponibilidades;