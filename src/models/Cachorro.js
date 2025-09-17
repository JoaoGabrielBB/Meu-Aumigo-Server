import mongoose from "mongoose";

const cachorroSchema = new mongoose.Schema(
    {
    id: {type: String},
    nome: {type: String,
        required: [true, "O nome do(a) Cachorro(a) é obrigatorio"]},
    historico: {type: String, 
        required:[true, "O historico do(a) Cachorro(a) é obrigatorio"]},
    idade: {type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 0 && valor <= 20;
            },
            message: "A idade do cachorro deve ser entre 0 e 20 anos. A idade fornecida ${VALUE}"
        }
    },
    vacinas: {type: String}
}
);

const cachorros = mongoose.model('cachorros', cachorroSchema);

export default cachorros;