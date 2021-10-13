import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Article from './article';

@Entity({
  name: 'category'
})
class Category {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '分类名称'
  })
  title: string = ''

  @Column({
    type: 'int',
    comment: '父类ID'
  })
  parentId: number = 0;

  @OneToMany(() => Article, article => article.category)
  articles!: Article[];

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间'
  })
  createTime: string = '';
}

export default Category;