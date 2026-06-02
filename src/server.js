import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` 
    ================================= 
    Servidor local corriendo exitosamente 
    en: http://localhost:${PORT} 
    =================================
    `);
});