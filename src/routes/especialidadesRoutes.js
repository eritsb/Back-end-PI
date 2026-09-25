const express = require("express");

const EspecialidadesController =
  require(
    "../controllers/especialidadesController"
  );

const router = express.Router();

router.get(
  "/",
  EspecialidadesController.listar
);

router.get(
  "/:id",
  EspecialidadesController.buscarPorId
);

router.post(
  "/",
  EspecialidadesController.cadastrar
);

router.put(
  "/:id",
  EspecialidadesController.atualizar
);

router.delete(
  "/:id",
  EspecialidadesController.excluir
);

module.exports = router;