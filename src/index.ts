import Express, { Request, Response } from 'express'
import cors from 'cors'
import appDataSource from './infra/data-source'
import { locationRouter, userRouter } from './routes'
// import './jobs/weatherUpdateCron'

const app = Express()
require('dotenv').config() 

app.use(Express.json())
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}))

appDataSource.initialize().then(() => {
  console.log('Banco de 🎲🎲🎲 rodando!')

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Ta rodando nessa porta aqui tá ✌️: http://localhost:${process.env.PORT || 3000}`)
  })
}).catch(error => console.log('Erro ao inicializar o banco de dados', error))

// Rota default
app.get('/', (req: Request, res: Response) => {
  res.send('Olá Kersys')
})

app.use('/user', userRouter)
app.use('/locations', locationRouter)
