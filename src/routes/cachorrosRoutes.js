import express from "express";
import CachorroController from "../controllers/cachorrosController.js";

const router = express.Router();

router
    .get("/cachorros", CachorroController.listarCachorros)
    .post("/cachorros", CachorroController.cadastrarCachorro)




export default router    