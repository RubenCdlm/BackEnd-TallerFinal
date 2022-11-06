import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'

const app = express()


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
    const id = req.params
    console.log(id);
    const [rows] = await pool.query('SELECT * FROM Productos where ?',[id])
      res.json(rows[0])
    
  })
  app.get('/Productos', async (req, res) => {
    const id = req.params
    const [rows] = await pool.query('SELECT * FROM Productos')
    res.json(rows)
  })

  app.listen(PORT)
  console.log('Server on port', PORT)


