// ordenarService.js
const express = require('express');
const axios = require("axios")
const app = express();
const port = 3002;

app.use(express.json());

//Agregamos el menú por defecto
let pedidos = [
]

app.post("/pedidos", async (req, res) => { //Hacer pedido
  let { productoId } = req.body;
  console.log(req.body)
  //Verificar inventario
  let response = await axios.get(`http://localhost:3001/inventario`);
  console.log(response)
  let producto = response.data.find(p => p.id === productoId)
  if (!producto || producto.cantidad <= 0) {
    return res.status(400).json({ mensaje: "Producto agotado" });
  }

  //Registrar pedido
  pedidos.push({ id: pedidos.length + 1, productoId });

  //estamos 1 unidad del inventario
  await axios.put(`http://localhost:3001/inventario/${productoId}`, { cantidad: producto.cantidad - 1 });

  res.json({ mensaje: "Pedido realizado", pedido: pedidos[pedidos.length - 1] });

})



app.listen(port, () => {
    console.log(`OrdenarService escuchando en http://localhost:${port}`);
});
