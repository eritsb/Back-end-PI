const express =
 require("express");

const router =
 express.Router();

const ProfissionaisController =
 require(
 "../controllers/profissionaisController"
 );

router.get(
 "/",
 ProfissionaisController.listar
);

router.get(
 "/:id",
 ProfissionaisController.buscarPorId
);

router.post(
 "/",
 ProfissionaisController.cadastrar
);

router.put(
 "/:id",
 ProfissionaisController.atualizar
);

router.delete(
 "/:id",
 ProfissionaisController.excluir
);

module.exports = router;