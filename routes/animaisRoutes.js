import express from "express";
import AnimalController from "../controllers/AnimaisController.js"; // relativo a routes
import upload from "..middlewares/upload.js";
import paginar from "..middlewares/paginar.js";

const router = express.Router();

router
    .get("/animais", AnimalController.listarAnimais, paginar)
    .get("/imagens-externas/:id", AnimalController.buscarImagemExterna)
    .get("/animais/:id", AnimalController.listarAnimalPorId)
    .post("/animais", upload.single("foto"), AnimalController.cadastrarAnimal)
    .put("/animais/:id", AnimalController.atualizarAnimal)
    .delete("/animais/:id", AnimalController.excluirAnimal)



export default router    