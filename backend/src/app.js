require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pacientesRoutes =
  require("./routes/pacientes.routes");

app.use(
  "/pacientes",
  pacientesRoutes
);

module.exports = app;