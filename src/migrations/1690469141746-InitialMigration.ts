import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1690469141746 implements MigrationInterface {
  name = "InitialMigration1690469141746";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" (
        "id" SERIAL NOT NULL, 
        "name" character varying(45) NOT NULL, 
        "email" character varying(45) NOT NULL, 
        "password" character varying(120) NOT NULL, 
        "telephone" integer NOT NULL, 
        "createdAt" date NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), 
        CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" (
        "id" SERIAL NOT NULL, 
        "name" character varying(45) NOT NULL, 
        "email" character varying(45) NOT NULL, 
        "second_email" character varying(45), 
        "telephone" integer NOT NULL, 
        "second_telephone" integer, 
        "createdAt" date NOT NULL DEFAULT now(), 
        "clientId" integer, 
        CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), 
        CONSTRAINT "UQ_6d1a8560f8b95bb893bf2c51cfc" UNIQUE ("second_email"), 
        CONSTRAINT "UQ_64587cae6751ad9fe10a21b3a46" UNIQUE ("telephone"), 
        CONSTRAINT "UQ_cc764e3be6d74924fe9d662af39" UNIQUE ("second_telephone"), 
        CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`
    );
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
