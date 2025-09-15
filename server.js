import express from "express"
import path from "path"
import mysql2 from "mysql2"
import { fileURLToPath } from "url";

const app = express()
const porta = 2409;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "html")))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("<h2>Servidor Rodando BONITO!</h2>") 
})

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "cadastro.html"));
});
app.post('/cadastro', (req,res) => {
    res.sendFile(path.join(__dirname, "html", "cadastro.html"))
    const {email , nome} = req.body
    console.log(`Email: ${email} Nome: ${nome}`)
})

app.listen(porta, () => {
    console.log(`Servidor Rodando na Porta: LocalHost: ${porta}`)
})