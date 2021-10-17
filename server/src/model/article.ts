import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import User from './user';
import Tag from './tag';
import Category from './category';

@Entity({
  name: 'article'
})
class Article {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column({
    type: 'varchar',
    length: 50,
    comment: '标题'
  })
  title: string = '';
  
  @Column({
    type: 'varchar',
    length: 200,
    comment: '描述'
  })
  desc: string = '';

  @Column({
    type: 'varchar',
    length: 50,
    comment: '封面图'
  })
  cover: string = '';

  @Column({
    type: 'varchar',
    length: 100,
    comment: '内容'
  })
  content: string = '';

  @Column({
    type: 'int',
    comment: '浏览数量'
  })
  view: number = 0;
  
  @Column({
    type: 'int',
    comment: '点赞数量'
  })
  good: number = 0;

  @Column({
    type: 'int',
    comment: '留言数量'
  })
  message: number = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间'
  })
  createTime: string = '';

  @Column({
    type: 'varchar',
    length: 20,
    comment: '修改时间'
  })
  updateTime: string = '';

  @ManyToOne(() => User, user => user.articles)
  @Column({
    name: 'userId',
    type: 'int',
    comment: '用户ID'
  })
  user: User = new User();

  @ManyToOne(() => Category, category => category.articles)
  @Column({
    name: 'categoryId',
    type: 'int',
    comment: '分类ID'
  })
  category: Category = new Category();

  @ManyToMany(() => Tag, tag => tag.articles)
  @JoinTable()
  tags!: Tag[];
}

export default Article
