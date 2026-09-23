const express = require("express");

const router = express.Router();

const pacientesController =
  require("../controllers/pacientes.controller");

// GET /pacientes
router.get("/", pacientesController.listar);

// GET /pacientes/:id
router.get("/:id", pacientesController.buscarPorId);

// POST /pacientes
router.post("/", pacientesController.cadastrar);

// PUT /pacientes/:id
router.put("/:id", pacientesController.atualizar);

// DELETE /pacientes/:id
router.delete("/:id", pacientesController.excluir);

module.exports = router;
