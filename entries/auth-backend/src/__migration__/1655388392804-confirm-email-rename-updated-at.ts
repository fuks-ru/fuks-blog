import { MigrationInterface, QueryRunner } from "typeorm";

export class confirmEmailRenameUpdatedAt1655388392804 implements MigrationInterface {
    name = 'confirmEmailRenameUpdatedAt1655388392804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP COLUMN "updatedAt"`);
    }

}
