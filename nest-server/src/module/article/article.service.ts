import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Article from 'src/entity/article.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async find(
    page: number,
    size: number,
    title?: string,
    desc?: string,
    category?: number,
  ) {
    const conditions: any = {
      take: size,
      skip: (page - 1) * size,
      where: {},
      relations: ['category', 'tags'],
    };
    title && (conditions.where.title = Like(`%${title}`));
    desc && (conditions.where.desc = Like(`%${desc}`));
    category > 0 && (conditions.where.category = category);

    return await this.articleRepository.findAndCount(conditions);
  }
}
