// inventario-Service
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

//Agregamos el menú por defecto
let inventario = [
  { id: 1, nombre: "Hamburguesa", cantidad: 3 },
  { id: 2, nombre: "Pizza", cantidad: 1 },
  { id: 3, nombre: "Ensalada", cantidad: 5}
]

// Rutas relacionadas al inventario de comidas
app.get('/inventario', (req, res) => {//Pasar el listado de todos los trabajadores
  res.status(200).json(inventario);
})

app.get('/inventario/:id', (req, res) => {//Pasar la información de un trabajador
  const producto = inventario.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" })
  res.status(200).json(trabajador)
})

app.post('/inventario', (req, res) => { //Agrega un nuevo trabajador
  const nuevoProducto = { id: inventario.length + 1, ...req.body }
  inventario.push(nuevoProducto);
  res.status(201).json(nuevoProducto)
})

app.put('/inventario/:id', (req, res) => { //Actualizar un trabajador
  const producto = inventario.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" })
  
  producto.cantidad = req.body.cantidad
  res.status(200).json(producto)
})

app.delete('/inventario/:id', (req, res) => { //Eliminar a un trabajador
  inventario = inventario.filter(p => p.id !== parseInt(req.params.id))
  res.status(200).json({mensaje: "Producto eliminado"})
})


app.listen(port, () => {
    console.log(`InventarioService escuchando en http://localhost:${port}`);
});
