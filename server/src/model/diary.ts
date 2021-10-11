import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'diary'
})
class Diary {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '描述'
  })
  desc: string = ''

  @Column({
    type: 'varchar',
    length: 50,
    comment: '封面图'
  })
  cover: string = ''

  @Column({
    type: 'text',
    comment: '内容'
  })
  content: string = ''

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间'
  })
  createTime: number = 0;
}

export default Diary;