import {MigrationInterface, QueryRunner} from "typeorm";

export class HeroMenaceFight1594355451556 implements MigrationInterface {
    name = 'HeroMenaceFight1594355451556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "heroRank" ("id" SERIAL NOT NULL, "name" character varying(1) NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_8c14487f9fa1f28b57e85ab1c6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hero" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "dateRegister" TIMESTAMP NOT NULL, "heroRankId" integer NOT NULL, "locationId" integer NOT NULL, CONSTRAINT "REL_e403f8498c64bf0e2a4d44c39a" UNIQUE ("locationId"), CONSTRAINT "PK_313d51d6899322b85f2df99ccde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "heroFight" ("id" SERIAL NOT NULL, "heroId" integer, "fightId" integer NOT NULL, CONSTRAINT "PK_515c79a8099927260fa85012d67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menaceRank" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_a2f8b319569f671d4419d695d87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menace" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "dateRegister" TIMESTAMP NOT NULL, "menaceRankId" integer NOT NULL, "locationId" integer NOT NULL, CONSTRAINT "REL_009875c9080462628ad7194043" UNIQUE ("locationId"), CONSTRAINT "PK_093fffe31049877a7c87ea2caf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fight" ("id" SERIAL NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "menaceId" integer NOT NULL, CONSTRAINT "REL_73e721561c139ad78cceefa5fb" UNIQUE ("menaceId"), CONSTRAINT "PK_c6ddb4bcedc3415b9f1b9d07b06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hero" ADD CONSTRAINT "FK_93198a3c70c5720111ddc5c6eaf" FOREIGN KEY ("heroRankId") REFERENCES "heroRank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hero" ADD CONSTRAINT "FK_e403f8498c64bf0e2a4d44c39a4" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "heroFight" ADD CONSTRAINT "FK_b80352d989b9392ac8f41977b35" FOREIGN KEY ("heroId") REFERENCES "hero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "heroFight" ADD CONSTRAINT "FK_86da44d497e2bf0b0fccf123a9a" FOREIGN KEY ("fightId") REFERENCES "fight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menace" ADD CONSTRAINT "FK_c5885607b940369c0f5f1a2baec" FOREIGN KEY ("menaceRankId") REFERENCES "menaceRank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menace" ADD CONSTRAINT "FK_009875c9080462628ad71940437" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_73e721561c139ad78cceefa5fbc" FOREIGN KEY ("menaceId") REFERENCES "menace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`insert into "heroRank" ("id", "name", "value") values (default, 'S', '80')`);
        await queryRunner.query(`insert into "heroRank" ("id", "name", "value") values (default, 'A', '40')`);
        await queryRunner.query(`insert into "heroRank" ("id", "name", "value") values (default, 'B', '20')`);
        await queryRunner.query(`insert into "heroRank" ("id", "name", "value") values (default, 'C', '10')`);

        await queryRunner.query(`insert into "menaceRank" ("id", "name", "value") values (default, 'Gold', '80')`);
        await queryRunner.query(`insert into "menaceRank" ("id", "name", "value") values (default, 'Silver', '40')`);
        await queryRunner.query(`insert into "menaceRank" ("id", "name", "value") values (default, 'Copper', '20')`);
        await queryRunner.query(`insert into "menaceRank" ("id", "name", "value") values (default, 'Wood', '10')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_73e721561c139ad78cceefa5fbc"`);
        await queryRunner.query(`ALTER TABLE "menace" DROP CONSTRAINT "FK_009875c9080462628ad71940437"`);
        await queryRunner.query(`ALTER TABLE "menace" DROP CONSTRAINT "FK_c5885607b940369c0f5f1a2baec"`);
        await queryRunner.query(`ALTER TABLE "heroFight" DROP CONSTRAINT "FK_86da44d497e2bf0b0fccf123a9a"`);
        await queryRunner.query(`ALTER TABLE "heroFight" DROP CONSTRAINT "FK_b80352d989b9392ac8f41977b35"`);
        await queryRunner.query(`ALTER TABLE "hero" DROP CONSTRAINT "FK_e403f8498c64bf0e2a4d44c39a4"`);
        await queryRunner.query(`ALTER TABLE "hero" DROP CONSTRAINT "FK_93198a3c70c5720111ddc5c6eaf"`);
        await queryRunner.query(`DROP TABLE "fight"`);
        await queryRunner.query(`DROP TABLE "menace"`);
        await queryRunner.query(`DROP TABLE "menaceRank"`);
        await queryRunner.query(`DROP TABLE "heroFight"`);
        await queryRunner.query(`DROP TABLE "hero"`);
        await queryRunner.query(`DROP TABLE "heroRank"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
