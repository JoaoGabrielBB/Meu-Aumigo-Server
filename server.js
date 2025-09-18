import "dotenv/config";
import app from "./app.js"; // <<--- CORREÇÃO AQUI

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});