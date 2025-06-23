// ordenarService.js
const express = require('express');
const axios = require("axios")
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

//Agregamos el menú por defecto
let pedidos = [
]

const SERVICES = {
  INVENTARIO: process.env.INVENTARIO_URL || "http://localhost:3001",
  PEDIDOS:    process.env.PEDIDOS_URL    || "http://localhost:3002",
  TRABAJADORES: process.env.TRABAJADORES_URL || "http://localhost:3003"
};

app.post("/pedidos", async (req, res) => { //Hacer pedido
  let { productoId } = req.body;
  console.log(req.body)
  //Verificar inventario
  let response = await axios.get(`${SERVICES.INVENTARIO}/inventario`);
  console.log(response)
  let producto = response.data.find(p => p.id === productoId)
  if (!producto || producto.cantidad <= 0) {
    return res.status(400).json({ mensaje: "Producto agotado" });
  }

  //Registrar pedido
  pedidos.push({ id: pedidos.length + 1, productoId });

  //estamos 1 unidad del inventario
  await axios.put(`${SERVICES.INVENTARIO}/inventario/${productoId}`, { cantidad: producto.cantidad - 1 });

  res.json({ mensaje: "Pedido realizado", pedido: pedidos[pedidos.length - 1] });

})



app.listen(port, () => {
    console.log(`OrdenarService escuchando en http://localhost:${port}`);
});
