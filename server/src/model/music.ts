import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'music'
})
class Music {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '歌名'
  })
  title: string = ''

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '作者'
  })
  author: string = ''

  @Column({
    type: 'varchar',
    length: 100,
    comment: '链接'
  })
  url: string = ''

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间'
  })
  createTime: string = '';
}

export default Music;