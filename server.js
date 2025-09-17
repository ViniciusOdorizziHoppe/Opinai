import express from "express"
import path from "path"
import mysql2 from "mysql2"
import { fileURLToPath } from "url"
import fs from "fs"

const app = express()
const porta = 2409;
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
    res.send("<h2>Servidor Rodando BONITO!</h2>") 
})

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});
app.post('/cadastro', (req,res) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"))
    const {email , senha} = req.body
    console.log(`Email: ${email} Senha: ${senha}`)
})
app.get("/camera", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "camera.html"))
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

