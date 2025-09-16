import express from "express"
import path from "path"
import mysql2 from "mysql2"
import { fileURLToPath } from "url";

const app = express()
const porta = 2409;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

app.listen(porta, () => {
    console.log(`Servidor Rodando na Porta: LocalHost: ${porta}`)
})