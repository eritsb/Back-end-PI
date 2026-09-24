const express = require("express");

const PacientesController =
  require("../controllers/pacientesController");

const router = express.Router();

router.get(
  "/",
  PacientesController.listar
);

router.get(
  "/:id",
  PacientesController.buscarPorId
);

router.post(
  "/",
  PacientesController.cadastrar
);

router.put(
  "/:id",
  PacientesController.atualizar
);

router.delete(
  "/:id",
  PacientesController.excluir
);

module.exports = router;