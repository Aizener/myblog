import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Article from './article';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({
    type: 'varchar',
    length: 20
  })
  email: string = '';

  @Column({
    type: 'varchar',
    length: 20
  })
  password: string = '';

  @Column({
    type: 'varchar',
    length: 20
  })
  phone: string = '';

  @Column({
    type: 'int'
  })
  active: number = 1;

  @OneToMany(() => Article, article => article.user)
  articles!: Article[];
}

export default User;