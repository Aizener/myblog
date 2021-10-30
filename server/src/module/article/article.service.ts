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

  async find({
    page,
    size,
    title,
    desc,
    category,
  }: {
    page: number,
    size: number,
    title?: string,
    desc?: string,
    category?: number,
  }) {
    const conditions: any = {
      take: size,
      skip: (page - 1) * size,
      where: {},
      relations: ['category', 'tags'],
      select: ['id', 'title', 'desc', 'cover', 'good', 'message', 'view', 'updateTime', 'createTime']
    };
    title && (conditions.where.title = Like(`%${title}%`));
    desc && (conditions.where.desc = Like(`%${desc}%`));
    category > 0 && (conditions.where.category = category);

    const [res, total]: any = await this.articleRepository.findAndCount(conditions);
    return [res, total];
  }

  async findOne(id: number) {
    return await this.articleRepository.findOne(id);
  }

  async save(article: Article) {
    return await this.articleRepository.save(article);
  }

  async removeOne(id: number) {
    return  await this.articleRepository.delete(id);
  }

  async remove(ids: Array<number>) {
    return await this.articleRepository.delete(ids);
  }
}
