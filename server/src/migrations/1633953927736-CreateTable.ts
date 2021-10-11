import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1633953927736 implements MigrationInterface {
    name = 'CreateTable1633953927736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(20) NOT NULL, \`password\` varchar(20) NOT NULL, \`phone\` varchar(20) NULL COMMENT '手机号', \`active\` int NOT NULL COMMENT '账号状态：1正常', \`avatar\` varchar(50) NULL COMMENT '头像', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL COMMENT '标题', \`desc\` varchar(200) NOT NULL COMMENT '描述', \`cover\` varchar(50) NOT NULL COMMENT '封面图', \`text\` varchar(100) NOT NULL COMMENT '内容', \`view\` int NOT NULL COMMENT '浏览数量', \`good\` int NOT NULL COMMENT '点赞数量', \`message\` int NOT NULL COMMENT '留言数量', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', \`updateTime\` varchar(20) NOT NULL COMMENT '修改时间', \`userId\` int NOT NULL COMMENT '用户ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`desc\` varchar(200) NOT NULL COMMENT '描述', \`cover\` varchar(50) NOT NULL COMMENT '封面图', \`content\` text NOT NULL COMMENT '内容', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_636f17dadfea1ffb4a412296a28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_636f17dadfea1ffb4a412296a28\``);
        await queryRunner.query(`DROP TABLE \`diary\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
