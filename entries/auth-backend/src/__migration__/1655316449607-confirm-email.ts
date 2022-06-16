import { MigrationInterface, QueryRunner } from "typeorm";

export class confirmEmail1655316449607 implements MigrationInterface {
    name = 'confirmEmail1655316449607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "confirm-codes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_7075f2a850919cbf11676d8223e" UNIQUE ("userId"), CONSTRAINT "REL_7075f2a850919cbf11676d8223" UNIQUE ("userId"), CONSTRAINT "PK_61de4f298044795351cd984f54e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isConfirmed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD CONSTRAINT "FK_7075f2a850919cbf11676d8223e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP CONSTRAINT "FK_7075f2a850919cbf11676d8223e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isConfirmed"`);
        await queryRunner.query(`DROP TABLE "confirm-codes"`);
    }

}
