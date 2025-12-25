import express from "express"
import path from "path"
import mysql2 from "mysql2"
import { fileURLToPath } from "url"
import fs from "fs"

const app = express()
const porta = process.env.PORT || 2409;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "10mb"}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});


app.get("/cadastro", (req, res) => {
 res.sendFile(path.join(__dirname, "public","cadastro.html"));
 console.log("Diretório atual:", __dirname);
});
app.post('/cadastro', (req,res) => {
    const {email , senha} = req.body
    console.log(`Email: ${email} Senha: ${senha}`)
    res.json({ success: true, message: "Cadastro realizado com sucesso!" });
})
app.get("/inicio", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "inicio.html"));
});
app.get("/denuncia", (req,res) => {
    res.sendFile(path.resolve(__dirname, "public", "denuncia.html"))
})


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

app.listen(porta, () => {
    console.log(`Servidor Rodando na Porta: LocalHost: ${porta}`)
})

