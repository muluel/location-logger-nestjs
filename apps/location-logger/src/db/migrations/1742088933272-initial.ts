import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1742088933272 implements MigrationInterface {
    name = 'Initial1742088933272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "coordinates" geography(Point,4326) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "area" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "coordinates" geography(Polygon,4326), CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_bdef5f9d46ef330ddca009a8596"`);
        await queryRunner.query(`DROP TABLE "area"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
