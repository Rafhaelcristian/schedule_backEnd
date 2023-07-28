import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEntitys1690560137626 implements MigrationInterface {
    name = 'FixEntitys1690560137626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_5e1236d7feffe204333944ed649" UNIQUE ("telephone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_5e1236d7feffe204333944ed649"`);
    }

}
