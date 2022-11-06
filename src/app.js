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
    const rows = [];
    console.log(id);
    if(id != ""){
      rows = await pool.query('SELECT * FROM Productos where ?',[id])
    }else{
      rows = await pool.query('SELECT * FROM Productos')
    }
    
    res.json(rows[0])
  })
  app.get('/InsertClient', async (req, res) => {
    const id = req.params
    const [rows] = await pool.query('SELECT * FROM Productos where ?',[id])
    res.json(rows[0])
  })

  app.listen(PORT)
  console.log('Server on port', PORT)


