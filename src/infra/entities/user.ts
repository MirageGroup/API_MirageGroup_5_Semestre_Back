import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
} from "typeorm"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true})
  user!: string

  @Column()
  password!: string
}