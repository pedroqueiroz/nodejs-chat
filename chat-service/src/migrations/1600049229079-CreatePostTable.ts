import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const TABLE_NAME = 'post'

export class CreatePostTable1600049229079 implements MigrationInterface {
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
            isNullable: false
          },
          {
            name: 'message',
            type: 'varchar'
          },
          {
            name: 'timestamp',
            type: 'timestamp',
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
