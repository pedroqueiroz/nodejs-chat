import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'

import { User } from '../entities/User'

export class CreateAdminUser1600035281395 implements MigrationInterface {
  public async up(): Promise<void> {
    const user = new User()
    user.userName = 'admin'
    user.password = 'admin'
    user.role = 'ADMIN'

    await getRepository(User).save(user)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository(User).delete({ userName: 'admin' })
  }
}
