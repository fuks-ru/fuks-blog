import { MigrationInterface, QueryRunner } from "typeorm";

export class confirmEmailRedirectFrom1655364358752 implements MigrationInterface {
    name = 'confirmEmailRedirectFrom1655364358752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD "redirectFrom" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP COLUMN "redirectFrom"`);
    }

}
