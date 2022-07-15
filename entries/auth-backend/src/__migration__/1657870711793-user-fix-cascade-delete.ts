import { MigrationInterface, QueryRunner } from "typeorm";

export class userFixCascadeDelete1657870711793 implements MigrationInterface {
    name = 'userFixCascadeDelete1657870711793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" DROP CONSTRAINT "FK_fb4ecd4acdad2d8860fb159d38d"`);
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP CONSTRAINT "FK_7075f2a850919cbf11676d8223e"`);
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" ADD CONSTRAINT "FK_fb4ecd4acdad2d8860fb159d38d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD CONSTRAINT "FK_7075f2a850919cbf11676d8223e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirm-codes" DROP CONSTRAINT "FK_7075f2a850919cbf11676d8223e"`);
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" DROP CONSTRAINT "FK_fb4ecd4acdad2d8860fb159d38d"`);
        await queryRunner.query(`ALTER TABLE "confirm-codes" ADD CONSTRAINT "FK_7075f2a850919cbf11676d8223e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" ADD CONSTRAINT "FK_fb4ecd4acdad2d8860fb159d38d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
