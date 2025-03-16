import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1742121678236 implements MigrationInterface {
    name = 'Initial1742121678236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location_log" ("id" SERIAL NOT NULL, "user" integer NOT NULL, "areaId" integer NOT NULL, "entryTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c62ed8b5814eb8da8bc7d62cd6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "location_log"`);
    }

}
