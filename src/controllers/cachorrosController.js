import { cachorros } from "../models/index.js";

class CachorroController {
    
    static listarCachorros = async (req, res, next) =>{
    try {
      const buscarCachorros = await cachorros.find();


      res.status(200).json(buscarCachorros);
    } catch (erro) {
      next(erro)
    }
}
  static cadastrarCachorro = async (req, res, next) => {
    try {
      let cachorro = new cachorros(req.body);

      const cachorroResultado = await cachorro.save();

      res.status(201).send(cachorroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }



}

export default CachorroController;