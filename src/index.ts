import Express, { Request, Response } from 'express';
import cors from "cors";
import userRouter from './routes/user.routes';
import appDataSource from './infra/data-source'

const app = Express()
require('dotenv').config()

app.use(Express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

appDataSource.initialize().then((connection) => {
  console.log("Banco de dados inicializado")
  app.listen(process.env.PORT, () => {
      console.log(`Ta rodando nessa porta aqui tá ✌️:  http://localhost:${process.env.PORT}`)
  })
})

// Rotas onde iremos fazer as req e res
app.get('/', (req, res) => {
  res.send('Olá Kersys')
})

app.use('/user', userRouter)
