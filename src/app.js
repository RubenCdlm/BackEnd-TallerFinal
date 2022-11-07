import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT "Bienvenidos" as RESULT')
    res.json(rows)
  })
  app.get('/cliente', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Cliente')
    res.json(rows)
  })
  app.get('/Productos/:Id_Producto', async (req, res) => {
    const id = req.params.Id_Producto
    let sql = `CALL Producto(?)`;
    const [rows] = await pool.query(sql,id);
      res.json(rows[0][0])
  })
  app.get('/Productos', async (req, res) => {
    const id = req.params
    const [rows] = await pool.query('SELECT * FROM Productos')
    res.json(rows)
  })

  app.post('/Post', async (req, res) => {
    const data = req.body; 
    const data1 = { Nombre_Cl: data.Nombre_Cl, Apellido_Cl: data.Apellido_Cl,Fecha_Naci: data.Fecha_Naci,Identi:data.Identi}
    let sql = `CALL Compra(?)`;
    const [rows] = await pool.query(sql,data1)
    res.json(rows)
  })

  app.listen(PORT)
  console.log('Server on port', PORT)


