function autorizarPerfis(
  ...perfisPermitidos
) {
  return (
    req,
    res,
    next
  ) => {
    if (!req.usuario) {
      return res.status(401).json({
        erro:
          "Usuário não autenticado"
      });
    }

    if (
      !perfisPermitidos.includes(
        req.usuario.perfil
      )
    ) {
      return res.status(403).json({
        erro:
          "Usuário sem permissão para esta operação"
      });
    }

    return next();
  };
}

module.exports = autorizarPerfis;