require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pacientesRoutes =
  require("./routes/pacientesRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    mensagem: "API Consulta Fácil funcionando"
  });
});

app.use(
  "/pacientes",
  pacientesRoutes
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${PORT}`
  );
});