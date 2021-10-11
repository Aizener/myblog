import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateArticle1633872542504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` MODIFY \`desc\` VARCHAR(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` MODIFY \`desc\` VARCHAR(100)`);
    }

}
