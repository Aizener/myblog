import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Diary from 'src/entity/diary.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>
  ) {}

  async find({
    page,
    size,
    title,
    desc
  }: {
    page: number,
    size: number,
    title?: string,
    desc?: string
  }) {
    const conditions: any = {
      take: size,
      skip: (page - 1) * size,
      where: {}
    };
    title && (conditions.where.title = Like(`%${title}%`));
    desc && (conditions.where.desc = Like(`%${desc}%`));

    const [res, total]: any = await this.diaryRepository.findAndCount(conditions);
    return [res, total];
  }

  async getTotal() {
    return await this.diaryRepository.count();
  }

  async findOne(id: number) {
    return await this.diaryRepository.findOne(id);
  }

  async save(diary: Diary) {
    return await this.diaryRepository.save(diary);
  }

  async removeOne(id: number) {
    const res =  await this.diaryRepository.delete(id);
    return res;
  }

  async remove(ids: Array<number>) {
    return await this.diaryRepository.delete(ids);
  }
}
