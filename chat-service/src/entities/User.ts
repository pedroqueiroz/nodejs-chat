import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
  BaseEntity
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import * as bcrypt from 'bcryptjs'

@Entity()
@Unique(['userName'])
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @IsNotEmpty()
  userName: string

  @Column()
  @IsNotEmpty()
  password: string

  @Column()
  @IsNotEmpty()
  role: string

  @BeforeInsert()
  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}

export default User
