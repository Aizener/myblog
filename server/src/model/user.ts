import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export default User;