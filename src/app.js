import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT "Bienvenidos" as RESULT')
    res.json(rows)
  })

  app.get('/ping', async (req, res) => {
    const [result] = await pool.query(`SELECT "Bienvenidos" as RESULT`);
    res.json(result[0])
  })

  app.get('/cliente', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Cliente')
    res.json(rows)
  })
  app.get('/Productos/:Id_Producto', async (req, res) => {
    const id = req.params.Id_Producto
    console.log(id);
    let sql = `CALL Producto(?)`;
    const [rows] = await pool.query(sql);
      res.json(rows[0])
  })
  app.get('/Productos', async (req, res) => {
    const id = req.params
    const [rows] = await pool.query('SELECT * FROM Productos')
    res.json(rows)
  })

 
  app.post('/Post', async (req, res) => {
    const data = req.body;
    console.log(data)
    const [rows] = await pool.query('Insert into Cliente set ?',data)
    res.json(rows)
  })

  app.listen(PORT)
  console.log('Server on port', PORT)


