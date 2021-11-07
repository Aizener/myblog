import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Article from 'src/entity/article.entity';
import { getConnection, Like, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';

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
    tag,
    category,
  }: {
    page: number,
    size: number,
    title?: string,
    desc?: string,
    tag?: number,
    category?: number,
  }) {
    // const conditions: any = {
    //   take: size,
    //   skip: (page - 1) * size,
    //   where: {},
    //   join: {
    //     alias: 'user',
    //     leftJoinAndSelect: {
    //       category: 'user.category',
    //       tags: 'user.tags'
    //     }
    //   },
    //   // relations: ['category', 'tags'],
    //   select: ['id', 'title', 'desc', 'cover', 'good', 'message', 'view', 'updateTime', 'createTime', 'tags.id']
    // };
    // title && (conditions.where.title = Like(`%${title}%`));
    // desc && (conditions.where.desc = Like(`%${desc}%`));
    // category > 0 && (conditions.where.category = category);
    // tag > 0 && (conditions.where['tags.id'] = Number(tag));

    // const [res, total]: any = await this.articleRepository.findAndCount(conditions);
    const queryBuilder: SelectQueryBuilder<Article> = getConnection()
      .createQueryBuilder()
      .select(['article.id', 'article.title', 'article.desc', 'article.cover', 'article.good', 'article.message', 'article.view', 'article.updateTime', 'article.createTime', 'category', 'tags'])
      .from(Article, 'article')
      .leftJoin('article.category', 'category')
      .leftJoin('article.tags', 'tags');
    
    if (title) {
      queryBuilder.andWhere({ title: Like(`%${title}%`)});
    }
    if (desc) {
      queryBuilder.andWhere({ desc: Like(`%${desc}%`)});

    }
    if (category) {
      queryBuilder.andWhere('article.category=:category', { category });
    }
    if (tag) {
      queryBuilder.andWhere('tags.id=:tag', { tag });
    }
    const [res, total]: any = await queryBuilder.orderBy('article.createTime', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
    return [res, total];
  }

  async findOne(id: number) {
    return await this.articleRepository.findOne(id);
  }

  async getTotal() {
    return await this.articleRepository.count();
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
