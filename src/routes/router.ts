import { Router } from "express";

export const router = Router()

router.get('/teste', (req, res) => {
  res.send('Rota teste')
})