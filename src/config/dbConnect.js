import mongoose from "mongoose";
import dontenv from "dotenv"
dontenv.config();

mongoose.connect(process.env.STRING_CONEXAO_BD);

let db = mongoose.connection;

export default db;