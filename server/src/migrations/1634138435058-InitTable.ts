import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTable1634138435058 implements MigrationInterface {
    name = 'InitTable1634138435058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(20) NOT NULL COMMENT '邮箱', \`password\` varchar(20) NOT NULL COMMENT '密码', \`phone\` varchar(20) NULL COMMENT '手机号', \`active\` int NOT NULL COMMENT '账号状态：1正常', \`avatar\` varchar(50) NULL COMMENT '头像', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(20) NOT NULL COMMENT '标签名', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(20) NOT NULL COMMENT '分类名称', \`parentId\` int NOT NULL COMMENT '父类ID', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL COMMENT '标题', \`desc\` varchar(200) NOT NULL COMMENT '描述', \`cover\` varchar(50) NOT NULL COMMENT '封面图', \`text\` varchar(100) NOT NULL COMMENT '内容', \`view\` int NOT NULL COMMENT '浏览数量', \`good\` int NOT NULL COMMENT '点赞数量', \`message\` int NOT NULL COMMENT '留言数量', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', \`updateTime\` varchar(20) NOT NULL COMMENT '修改时间', \`userId\` int NOT NULL COMMENT '用户ID', \`categoryId\` int NOT NULL COMMENT '分类ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`desc\` varchar(200) NOT NULL COMMENT '描述', \`cover\` varchar(50) NOT NULL COMMENT '封面图', \`content\` text NOT NULL COMMENT '内容', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`music\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL COMMENT '歌名', \`author\` varchar(20) NOT NULL COMMENT '作者', \`url\` varchar(100) NOT NULL COMMENT '链接', \`createTime\` varchar(20) NOT NULL COMMENT '创建时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article_tags_tag\` (\`articleId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_9b7dd28292e2799512cd70bfd8\` (\`articleId\`), INDEX \`IDX_5fee2a10f8d6688bd2f2c50f15\` (\`tagId\`), PRIMARY KEY (\`articleId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_636f17dadfea1ffb4a412296a28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_12824e4598ee46a0992d99ba553\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article_tags_tag\` ADD CONSTRAINT \`FK_9b7dd28292e2799512cd70bfd81\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`article_tags_tag\` ADD CONSTRAINT \`FK_5fee2a10f8d6688bd2f2c50f15e\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article_tags_tag\` DROP FOREIGN KEY \`FK_5fee2a10f8d6688bd2f2c50f15e\``);
        await queryRunner.query(`ALTER TABLE \`article_tags_tag\` DROP FOREIGN KEY \`FK_9b7dd28292e2799512cd70bfd81\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_12824e4598ee46a0992d99ba553\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_636f17dadfea1ffb4a412296a28\``);
        await queryRunner.query(`DROP INDEX \`IDX_5fee2a10f8d6688bd2f2c50f15\` ON \`article_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b7dd28292e2799512cd70bfd8\` ON \`article_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`article_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`music\``);
        await queryRunner.query(`DROP TABLE \`diary\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
