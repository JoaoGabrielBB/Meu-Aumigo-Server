import express from "express";
import db from ".dbConnect.js"
import routes from ".index.js";
import cors from "cors";
import manipulador404 from ".manipulador404.js";
import manipuladorDeErros from ".manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"))
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
})

const app = express();
app.use("/imagens", express.static("imagens"));
app.use(cors());
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros)



export default app