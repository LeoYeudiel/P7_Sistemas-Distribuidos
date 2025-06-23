// gateway
const express = require('express');
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// URLs de los microservicios (configuradas como variables de entorno)
const SERVICES = {
  INVENTARIO: process.env.INVENTARIO_URL || "http://localhost:3001",
  PEDIDOS:    process.env.PEDIDOS_URL    || "http://localhost:3002",
  TRABAJADORES: process.env.TRABAJADORES_URL || "http://localhost:3003"
};

// Función que reenvía la solicitud a otro microservicio
const proxy = (urlBase) => async (req, res) => {
  console.log(`Petición a ${urlBase + req.url} del método ${req.method}, con cuerpo ${req.body}`)
  try {
    const response = await axios({
      method: req.method,
      url: `${urlBase}${req.url}`,
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Error en el gateway' });
    }
  }
};

// Redirecciones para cada microservicio
app.use("/inventario", proxy(SERVICES.INVENTARIO));
app.use("/pedidos", proxy(SERVICES.PEDIDOS));
app.use("/trabajadores", proxy(SERVICES.TRABAJADORES));

app.listen(port, () => {
    console.log(`Gateway escuchando en http://localhost:${port}`);
});
