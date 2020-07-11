import {MigrationInterface, QueryRunner} from "typeorm";

export class FightAdjustment1594418931928 implements MigrationInterface {
    name = 'FightAdjustment1594418931928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_73e721561c139ad78cceefa5fbc"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "REL_73e721561c139ad78cceefa5fb"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP COLUMN "menaceId"`);
        await queryRunner.query(`ALTER TABLE "menace" ADD "fightId" integer`);
        await queryRunner.query(`ALTER TABLE "menace" ADD CONSTRAINT "UQ_7597edd8a0346c69b706456883d" UNIQUE ("fightId")`);
        await queryRunner.query(`ALTER TABLE "fight" ALTER COLUMN "dateEnd" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menace" ADD CONSTRAINT "FK_7597edd8a0346c69b706456883d" FOREIGN KEY ("fightId") REFERENCES "fight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menace" DROP CONSTRAINT "FK_7597edd8a0346c69b706456883d"`);
        await queryRunner.query(`ALTER TABLE "fight" ALTER COLUMN "dateEnd" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menace" DROP CONSTRAINT "UQ_7597edd8a0346c69b706456883d"`);
        await queryRunner.query(`ALTER TABLE "menace" DROP COLUMN "fightId"`);
        await queryRunner.query(`ALTER TABLE "fight" ADD "menaceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "REL_73e721561c139ad78cceefa5fb" UNIQUE ("menaceId")`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_73e721561c139ad78cceefa5fbc" FOREIGN KEY ("menaceId") REFERENCES "menace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
