import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Article from './article';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '邮箱'
  })
  email: string = '';

  @Column({
    type: 'varchar',
    length: 20,
    comment: '密码'
  })
  password: string = '';

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '手机号'
  })
  phone: string = '';

  @Column({
    type: 'int',
    comment: '账号状态：1正常'
  })
  active: number = 1;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '头像'
  })
  avatar: string = ''

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间'
  })
  createTime: string = '';

  @OneToMany(() => Article, article => article.user)
  articles!: Article[];
}

export default User;