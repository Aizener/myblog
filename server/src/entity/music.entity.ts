import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'music',
})
class Music {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '歌名',
  })
  title = '';

  @Column({
    type: 'varchar',
    length: 20,
    comment: '作者',
  })
  author = '';

  @Column({
    type: 'varchar',
    length: 100,
    comment: '链接',
  })
  url = '';

  @Column({
    type: 'varchar',
    length: 20,
    comment: '创建时间',
  })
  createTime = '';
}

export default Music;
