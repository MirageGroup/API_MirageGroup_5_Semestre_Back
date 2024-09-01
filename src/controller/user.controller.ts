import {
  Request,
  Response,
} from 'express'
import { UserService } from 'services'
import { QueryFailedError } from 'typeorm'

export default class UserController {

  public constructor(
    private readonly userService: UserService
  ) { }

  public async createUserController(req: Request, res: Response) {
    const { user, password } = req.body
    if(!user || !password) return res.sendStatus(400)
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
              return res.sendStatus(200)
          }else{
              return res.sendStatus(401)
          }
      } catch(error) {
        console.log(`Error ${error}`)
      }
  } 
}