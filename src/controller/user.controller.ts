import {
  Request,
  Response,
} from 'express'

import { UserService } from 'services'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'

export default class UserController {

  public constructor(
    private readonly userService: UserService
  ) { }

  public async createUserController(req: Request, res: Response) {
    const { user, password, name } = req.body
    if(!user || !password || !name) return res.sendStatus(400)
    try {
        await this.userService.createUser(req.body)
        res.sendStatus(201)
    } catch(error) {
        console.error(error)
        if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
            return res.sendStatus(409)
        }
        return res.status(500).send(error)
    }
}

  public async loginController(req: Request, res: Response) {
      const { user, password } = req.body
      if(!user || !password) return res.sendStatus(400)
      try{
          const login = await this.userService.login(req.body)
          if(login){
            return res.status(200).json(login.id);
          }else{
              return res.sendStatus(401)
          }
      } catch(error) {
        console.log(`Error ${error}`)
      }
  } 

  public async getProfileController(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.sendStatus(400) 

    try {
        const user = await this.userService.getUserById(id)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        if (error instanceof EntityNotFoundError) {
            return res.sendStatus(404)
        }
        return res.status(500).send(error)
    }
}

public async updateUserController(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { name, user, password } = req.body

  if (!name || !user || !password || isNaN(id)) return res.sendStatus(400)

  try {
      await this.userService.updateUser(id, req.body)
      res.sendStatus(200)
  } catch (error) {
      console.error(error)
      return res.status(500).send(error)
  }
}

public async deleteUserController(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.sendStatus(400)

  try {
      await this.userService.deleteUser(id)
      return res.sendStatus(204)
  } catch (error) {
      console.error('Erro ao tentar deletar o usuário:', error)
      return res.status(500).json({ message: 'Erro interno no servidor.' })
  }
}

}