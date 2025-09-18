import Requisicaoincorreta from "../erro/RequisicaoIncorreta.js"

async function paginar(req, res, next){
    try{
        let {limite = 5, pagina = 1, ordenacao = "_id:1"} = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":")
        limite = Number.isNaN(parseInt(limite)) ? 5 : parseInt(limite);
        pagina = Number.isNaN(parseInt(pagina)) ? 1 : parseInt(pagina);
        ordem = Number.isNaN(parseInt(ordem)) ? -1 : parseInt(ordem);

        const resultado = req.resultado;

        if(limite > 0 && pagina > 0){
            const animaisResultado = await resultado.find()
            .sort({[campoOrdenacao]: ordem})
            .skip((pagina -1) * limite)
            .limit(limite)
            .exec();

            res.status(200).json(animaisResultado);
        }else{
            next(new Requisicaoincorreta())
        }
    }catch(erro){
        next(erro);
    }
}

export default paginar