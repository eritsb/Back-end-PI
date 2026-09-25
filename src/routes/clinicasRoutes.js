const express = require("express");

const ClinicasController =
  require(
    "../controllers/clinicasController"
  );

const router = express.Router();

router.get(
  "/",
  ClinicasController.listar
);

router.get(
  "/:id",
  ClinicasController.buscarPorId
);

router.post(
  "/",
  ClinicasController.cadastrar
);

router.put(
  "/:id",
  ClinicasController.atualizar
);

router.delete(
  "/:id",
  ClinicasController.excluir
);

module.exports = router;