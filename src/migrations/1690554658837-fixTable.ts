import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTable1690554658837 implements MigrationInterface {
    name = 'FixTable1690554658837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_64587cae6751ad9fe10a21b3a46"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "telephone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_64587cae6751ad9fe10a21b3a46" UNIQUE ("telephone")`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_cc764e3be6d74924fe9d662af39"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "second_telephone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "second_telephone" character varying`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_cc764e3be6d74924fe9d662af39" UNIQUE ("second_telephone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_cc764e3be6d74924fe9d662af39"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "second_telephone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "second_telephone" integer`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_cc764e3be6d74924fe9d662af39" UNIQUE ("second_telephone")`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_64587cae6751ad9fe10a21b3a46"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "telephone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_64587cae6751ad9fe10a21b3a46" UNIQUE ("telephone")`);
    }

}
