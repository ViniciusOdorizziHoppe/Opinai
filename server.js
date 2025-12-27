import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const porta = process.env.PORT || 2409;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// pasta de uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 👉 servir frontend
app.use(express.static(path.join(__dirname, "public")));

// 👉 rotas das páginas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "cadastro.html"));
});

app.get("/html/inicio", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "inicio.html"));
});

app.get("/html/denuncia", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "denuncia.html"));
});

// 👉 API de cadastro
app.post("/html/cadastro", (req, res) => {
  const { email, senha } = req.body;
  console.log(`Cadastro -> Email: ${email} | Senha: ${senha}`);

  res.json({
    success: true,
    message: "Cadastro realizado com sucesso!"
  });
});

// 👉 upload de imagem
app.post("/uploads", (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).send("Nenhuma imagem recebida");
  }

  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const filePath = path.join(uploadDir, `foto_${Date.now()}.png`);

  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao salvar a imagem");
    }
    res.send("Imagem salva em: " + filePath);
  });
});

// 👉 start
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "img-src 'self' data:; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "script-src 'self' 'unsafe-inline'; " +
    "font-src 'self' https://fonts.gstatic.com;"
  );
  next();
});
