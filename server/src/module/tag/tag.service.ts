import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Tag from 'src/entity/tag.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
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

    const [res, total]: any = await this.tagRepository.findAndCount(conditions);
    return [res, total];
  }

  async save(tag: Tag) {
    return await this.tagRepository.save(tag);
  }

  async removeOne(id: number) {
    const res =  await this.tagRepository.delete(id);
    return res;
  }

  async remove(ids: Array<number>) {
    return await this.tagRepository.delete(ids);
  }
}
