import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import Article from './article.entity';

@Entity({
  name: 'tag',
})
class Tag {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签名',
  })
  title = '';

  @ManyToMany(() => Article, (article) => article.tags)
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

export default Tag;
