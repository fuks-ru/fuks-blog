import { MigrationInterface, QueryRunner } from "typeorm";

export class forgotPassword1655480373945 implements MigrationInterface {
    name = 'forgotPassword1655480373945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forgot-password-codes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "redirectFrom" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_fb4ecd4acdad2d8860fb159d38d" UNIQUE ("userId"), CONSTRAINT "REL_fb4ecd4acdad2d8860fb159d38" UNIQUE ("userId"), CONSTRAINT "PK_f76e78c2704e0b18dd4de9cd00d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" ADD CONSTRAINT "FK_fb4ecd4acdad2d8860fb159d38d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot-password-codes" DROP CONSTRAINT "FK_fb4ecd4acdad2d8860fb159d38d"`);
        await queryRunner.query(`DROP TABLE "forgot-password-codes"`);
    }

}
