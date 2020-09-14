import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @IsNotEmpty()
  userName: string

  @Column()
  message: string

  @Column()
  @IsNotEmpty()
  timestamp: Date
}

export default Post
