import { Router } from "express"

import appDataSource from "../infra/data-source"
import { User } from "../infra"
import { UserService } from "../services"
import { UserController } from "../controller"

export const userRouter = Router()

const service = new UserService(appDataSource.getRepository(User))
const controller = new UserController(service)

userRouter.post('/create', async (req, res) => {
    await controller.createUserController(req, res)
})

userRouter.post('/login', async (req, res) => {
    await controller.loginController(req, res)
})

export default userRouter