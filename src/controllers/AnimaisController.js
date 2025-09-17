import { animais } from "../models/index.js";
import https from "https"; // módulo nativo do Node
import fetch from "node-fetch"; // se ainda não estiver importado
import NaoEncontrado from "../erro/NaoEncontrado.js";

class AnimalController {
    
    static listarAnimais = async (req, res, next) =>{
    try {
      req.resultado = animais
      next();
    } catch (erro) {
      next(erro)
    }
}

  static listarAnimalPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const animalResultado = await animais.findById(id)
      .populate("nome", "raca")
      .exec();


      if (animalResultado !== null){
        res.status(200).send(animalResultado);
      }else{
        next(new NaoEncontrado("Id do Animal não encontrado"))
      }
    }catch(erro){
      next(erro)
    }
  }


  static cadastrarAnimal = async (req, res, next) => {
    try {
      const { nome, idade, raca, historico, vacinas } = req.body;

      const novoPet = await animais.create({
        nome,
        idade,
        raca,
        historico,
        vacinas,
        foto: req.file ? `/imagens/${req.file.filename}` : null, // pega do multer
      });

      res.status(201).json(novoPet);
    } catch (erro) {
      next(erro)
    }
  }


  static atualizarAnimal = async(req, res, next) =>{
    try{
      const id = req.params.id;

      const animalResultado = await animais.findByIdAndUpdate(id, {$set: req.body});

      if(animalResultado !== null){
        res.status(200).send({message: "Pet atualizado com sucesso!"})
      }else{
        next(new NaoEncontrado("Id do Pet não localizado"))
      }

    }catch (erro){
        next(erro);
    }
  }

  static excluirAnimal = async (req, res, next) =>{
    try{
      const id = req.params.id

      const animalResultado = await animais.findByIdAndDelete(id);

      if(animalResultado !== null) {
        res.status(200).send({message: "Animal removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do animal não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
 static buscarImagemExterna = async (req, res, next) => {
    const { id } = req.params;

    try {
      // Cria um agente HTTPS que ignora certificados não confiáveis
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      const response = await fetch(`https://dlnk.one/e?id=${id}&type=1`, { agent });

      if (!response.ok) {
        return res.status(404).json({ erro: 'Imagem não encontrada' });
      }

      const buffer = await response.arrayBuffer();
      res.set('Content-Type', 'image/jpeg'); // ajustar se for png, webp etc
      res.send(Buffer.from(buffer));

    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar a imagem' });
    }
  }


}

export default AnimalController;