import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entity/category.entity';
import { getConnection, Like, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
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

    const [res, total]: any = await this.categoryRepository.findAndCount(conditions);
    return [res, total];
  }

  async findCategoryAndArticle() {
    const res: any = await getConnection()
      .createQueryBuilder()
      .select(['category', 'article.id'])
      .from(Category, 'category')
      .leftJoin('category.articles', 'article')
      .orderBy('category.createTime', 'DESC')
      .limit(3)
      .getMany();

    return res;
  }

  async save(category: Category) {
    return await this.categoryRepository.save(category);
  }

  async removeOne(id: number) {
    const res =  await this.categoryRepository.delete(id);
    return res;
  }

  async remove(ids: Array<number>) {
    return await this.categoryRepository.delete(ids);
  }
}
