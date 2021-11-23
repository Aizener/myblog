import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entity/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async find({
    page,
    size,
    email,
    phone
  }: {
    page: number,
    size: number,
    email?: string,
    phone?: string
  }) {
    const conditions: any = {
      take: size,
      skip: (page - 1) * size,
      where: {}
    };
    email && (conditions.where.email = Like(`%${email}%`));
    phone && (conditions.where.phone = Like(`%${phone}%`));

    const [res, total]: any = await this.userRepository.findAndCount(conditions);
    return [res, total];
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }

  async removeOne(id: number) {
    const res =  await this.userRepository.delete(id);
    return res;
  }

  async remove(ids: Array<number>) {
    return await this.userRepository.delete(ids);
  }
}
