import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
    {
    id: {type: String},
    foto: {type: String},
    nome: {type: String,
        required: [true, "O nome do animal é obrigatorio"]},
    raca: {type: String,
        required: [true, "O tipo de animal tem que ser especificado"]
    },
    historico: {type: String, 
        required:[true, "O historico do animal é obrigatorio"]},
    idade: {type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 0 && valor <= 20;
            },
            message: "A idade do animal deve ser entre 0 e 20 anos. A idade fornecida ${VALUE}"
        }
    },
    vacinas: {type: String}
}
);

const animais = mongoose.model('anmais', animalSchema);

export default animais;