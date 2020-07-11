import {MigrationInterface, QueryRunner} from "typeorm";

export class FixMenaceTypes1594433870950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`update "menaceRank" set "name" = 'God' where "name" = 'Gold'`)
        await queryRunner.query(`update "menaceRank" set "name" = 'Dragon' where "name" = 'Silver'`)
        await queryRunner.query(`update "menaceRank" set "name" = 'Tiger' where "name" = 'Copper'`)
        await queryRunner.query(`update "menaceRank" set "name" = 'Wolf' where "name" = 'Wood'`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
