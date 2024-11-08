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
        }
        
        else{
            const passwordMatch = await bcrypt.compare(login.password, user.password)
            if (passwordMatch) {
                return { id: user.id }; 
            } else {
                return false;
            }
        }
    }

    public async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if(!user){
            throw new EntityNotFoundError('user', `User with id ${id} not found`)
        }else{
            return user
        }
    }

    public async updateUser(id: number, userData: Partial<User>) {
        await this.userRepository.update(id, userData)
        const updatedUser = await this.getUserById(id) 
        return updatedUser
    }
    

    public async deleteUser(id: number) {
        const user = await this.getUserById(id) 
        return await this.userRepository.delete(user.id)
    }
    
}