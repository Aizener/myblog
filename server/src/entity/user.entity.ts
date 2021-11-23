import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Article from './article.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '邮箱',
  })
  email = '';

  @Column({
    type: 'varchar',
    length: 50,
    comment: '密码',
  })
  password = '';

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '手机号',
  })
  phone = '';

  @Column({
    type: 'int',
    comment: '账号状态：1正常',
  })
  active = 1;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '头像',
  })
  avatar = '';

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间',
  })
  createTime = '';

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '修改时间',
  })
  updateTime = '';

  @OneToMany(() => Article, (article) => article.user)
  articles!: Article[];
}

export default User;
