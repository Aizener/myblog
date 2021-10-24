import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Music from 'src/entity/music.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>
  ) {}
  
  async find({
    page,
    size,
    title,
    author
  }: {
    page: number,
    size: number,
    title?: string,
    author?: string
  }) {
    const conditions: any = {
      take: size,
      skip: (page - 1) * size,
      where: {}
    };
    title && (conditions.where.title = Like(`%${title}%`));
    author && (conditions.where.author = Like(`%${author}%`));

    const [res, total]: any = await this.musicRepository.findAndCount(conditions);
    return [res, total];
  }

  async save(music: Music) {
    return await this.musicRepository.save(music);
  }

  async removeOne(id: number) {
    const res =  await this.musicRepository.delete(id);
    return res;
  }

  async remove(ids: Array<number>) {
    return await this.musicRepository.delete(ids);
  }
}
