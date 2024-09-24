import { EntityNotFoundError, Repository } from "typeorm"
import bcrypt from 'bcrypt'

import { User } from "../infra"

export default class UserService {
    
    public constructor(
        private readonly userRepository: Repository<User>
    ){ }

    public async createUser(user: User) {
        user.password = await bcrypt.hash(user.password, 10)
        return this.userRepository.save(user)
    }
    public async login(login: User) {
        const user = await this.userRepository.findOne({ where: { user: login.user } })
        if(!user){
            throw new EntityNotFoundError('user', 'user = ' + login.user)
        }else{
            return await bcrypt.compare(login.password, user.password)
        }
    }
}