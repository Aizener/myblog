import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import Article from './article';

@Entity({
  name: 'tag'
})
class Tag {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签名'
  })
  title: string = '';

  @ManyToMany(() => Article, article => article.tags)
  @Column({
    name: 'articleId',
    type: 'int',
    comment: '文章ID'
  })
  articles!: Article[];

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间'
  })
  createTime: string = '';
}

export default Tag;