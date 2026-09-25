const jwt = require("jsonwebtoken");

function autenticacao(
  req,
  res,
  next
) {
  try {
    const cabecalho =
      req.headers.authorization;

    if (
      !cabecalho ||
      !cabecalho.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        erro:
          "Token de autenticação não informado"
      });
    }

    const token =
      cabecalho.substring(7);

    const dados =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.usuario = {
      id: dados.id,
      perfil: dados.perfil
    };

    return next();
  } catch (error) {
    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        erro:
          "Token de autenticação expirado"
      });
    }

    return res.status(401).json({
      erro:
        "Token de autenticação inválido"
    });
  }
}

module.exports = autenticacao;