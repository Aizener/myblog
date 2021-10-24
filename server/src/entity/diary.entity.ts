import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'diary',
})
class Diary {
  @PrimaryGeneratedColumn()
  id = 0;

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
    type: 'varchar',
    length: 20,
    comment: '创建时间',
  })
  createTime = '';
}

export default Diary;
