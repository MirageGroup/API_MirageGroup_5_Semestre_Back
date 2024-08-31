import Express, { Request, Response } from 'express';
import { router } from './routes/router';

const app = Express()
require('dotenv').config()

app.listen(process.env.PORT, () => {
  console.log(`Ta rodando nessa porta aqui tá ✌️  http://localhost:${process.env.PORT}`)
})

// Rotas onde iremos fazer as req e res
app.get('/', (req, res) => {
  res.send('Olá Kersys')
})

app.use('/router', router)
