import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import User from './user.entity';
import Tag from './tag.entity';
import Category from './category.entity';

@Entity({
  name: 'article',
})
class Article {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '标题',
  })
  title = '';

  @Column({
    type: 'varchar',
    length: 200,
    comment: '描述',
  })
  desc = '';

  @Column({
    type: 'varchar',
    length: 50,
    comment: '封面图',
  })
  cover = '';

  @Column({
    type: 'text',
    comment: '内容',
  })
  content = '';

  @Column({
    type: 'text',
    comment: '内容（html）'
  })
  htmlContent = '';

  @Column({
    type: 'int',
    nullable: true,
    comment: '浏览数量',
  })
  view = 0;

  @Column({
    type: 'int',
    nullable: true,
    comment: '点赞数量',
  })
  good = 0;

  @Column({
    type: 'int',
    nullable: true,
    comment: '留言数量',
  })
  message = 0;

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

  @ManyToOne(() => User, (user) => user.articles)
  @Column({
    name: 'userId',
    type: 'int',
    comment: '用户ID',
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.articles)
  @Column({
    name: 'categoryId',
    type: 'int',
    comment: '分类ID',
  })
  category: Category = new Category();

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable()
  tags!: Tag[];
}

export default Article;
