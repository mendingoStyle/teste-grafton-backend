import { MigrationInterface, QueryRunner, Table } from "typeorm"
const table = new Table({
    name: 'movies',
    columns: [
        {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
        },
        {
            name: 'title',
            type: 'varchar(255)',
            isNullable: true,
        },
        {
            name: 'description',
            type: 'varchar(255)',
            isNullable: true,
        },
        {
            name: 'image',
            type: 'varchar(255)',
            isNullable: true,
        },
        {
            name: 'director',
            type: 'varchar(255)',
            isNullable: true,
        },
        {
            name: 'producer',
            type: 'varchar(255)',
            isNullable: true,
        },
        {
            name: 'realeaseYear',
            type: 'varchar(4)',
            isNullable: true,
        },
        {
            name: 'createdAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_timestamp',
        },
        {
            name: 'updatedAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_timestamp',
            onUpdate: 'CURRENT_timestamp',
        },
    ],
})
export class createTableMovies1678751329340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(table, true, true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(table, true)
    }

}
