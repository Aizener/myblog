import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Article from './article.entity';

@Entity({
  name: 'category',
})
class Category {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '分类名称',
  })
  title = '';

  @Column({
    type: 'int',
    comment: '父类ID',
  })
  parentId = 0;

  @OneToMany(() => Article, (article) => article.category)
  articles!: Article[];

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
}

export default Category;
