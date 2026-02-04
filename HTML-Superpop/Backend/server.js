import express from "express";
import pkg from "pg";
import cors from "cors";
import "dotenv/config";

const { Pool } = pkg;
const app = express();

/* =========================
  * Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
  * Health check
========================= */
app.get("/", (req, res) => {
  res.send("API Superpop OK");
});

/* =========================
  * PostgreSQL
========================= */
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionString: process.env.DATABASE_URL,
  options: '-c search_path=Superpop'
});

/* =========================
  * Rota principal
========================= */
app.post("/enviar", async (req, res) => {
  try {
    const {
      num_remetente,
      num_destinatario,
      colaborador,
      reconhecido_por,
      valores,
      observacoes
    } = req.body;

    if (!colaborador || !reconhecido_por) {
      return res.status(400).json({
        erro: "Campos obrigatórios ausentes",
      });
    }

    await pool.query(
      `
      INSERT INTO superpop.resultados_superpop
  (num_remetente, num_destinatario, colaborador, reconhecido_por, valores, observacoes)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING num_op
  `,
  [
    num_remetente,
    num_destinatario,
    colaborador,
    reconhecido_por,
    valores,
    observacoes
  ]
);

    res.status(201).json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao salvar reconhecimento:", err);
    res.status(500).json({ erro: "Erro interno" });
  }
});

/* =========================
  * Start
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
