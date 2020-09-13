import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const TABLE_NAME = 'user'

export class CreateUserTable1600034708966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'userName',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME)
  }
}
