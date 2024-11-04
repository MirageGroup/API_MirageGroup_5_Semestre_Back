import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn,
  Table, 
} from "typeorm"

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true})
  user!: string

  @Column()
  password!: string
}