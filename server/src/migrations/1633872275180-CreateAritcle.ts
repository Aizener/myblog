import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAritcle1633872275180 implements MigrationInterface {
    name = 'CreateAritcle1633872275180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL COMMENT '标题', \`desc\` varchar(100) NOT NULL COMMENT '描述', \`view\` int NOT NULL COMMENT '浏览数量', \`good\` int NOT NULL COMMENT '点赞数量', \`message\` int NOT NULL COMMENT '留言数量', \`createTime\` varchar(13) NOT NULL COMMENT '创建时间', \`updateTime\` varchar(13) NOT NULL COMMENT '修改时间', \`userId\` int NOT NULL COMMENT '用户ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_636f17dadfea1ffb4a412296a28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_636f17dadfea1ffb4a412296a28\``);
        await queryRunner.query(`DROP TABLE \`article\``);
    }

}
