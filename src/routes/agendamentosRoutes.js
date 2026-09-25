const express = require("express");

const AgendamentosController =
  require(
    "../controllers/agendamentosController"
  );

const router = express.Router();

/*
  Esta rota deve ficar antes de /:id,
  para "paciente" não ser interpretado
  como um ID de agendamento.
*/

router.get(
  "/paciente/:idPaciente",
  AgendamentosController
    .listarPorPaciente
);

router.get(
  "/",
  AgendamentosController.listar
);

router.get(
  "/:id",
  AgendamentosController.buscarPorId
);

router.post(
  "/",
  AgendamentosController.cadastrar
);

router.put(
  "/:id",
  AgendamentosController.atualizar
);

router.patch(
  "/:id/cancelar",
  AgendamentosController.cancelar
);

router.delete(
  "/:id",
  AgendamentosController.excluir
);

module.exports = router;