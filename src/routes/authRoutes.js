const express = require("express");

const AuthController =
  require("../controllers/authController");

const autenticacao =
  require("../middlewares/autenticacao");

const autorizarPerfis =
  require(
    "../middlewares/autorizarPerfis"
  );

const router = express.Router();

/*
  Rota pública para login.
*/

router.post(
  "/login",
  AuthController.login
);

/*
  Rota protegida para conferir
  o token e retornar o perfil.
*/

router.get(
  "/perfil",
  autenticacao,
  autorizarPerfis("PACIENTE"),
  AuthController.perfil
);

module.exports = router;